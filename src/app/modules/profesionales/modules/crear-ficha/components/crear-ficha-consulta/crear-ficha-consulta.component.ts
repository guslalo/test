import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AdminitrativeService } from './../../../../../../services/administrative.service';
import { TranslocoService } from '@ngneat/transloco';
import { takeWhile } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-crear-ficha-consulta',
  templateUrl: './crear-ficha-consulta.component.html',
  styleUrls: ['./crear-ficha-consulta.component.scss'],
})
export class CrearFichaConsultaComponent implements OnInit {
  public idConsulta: any;
  public appointmentDetail: any;
  public access_token: any;
  public downloadUrl: any;
  public user: any;
  public userId: any;
  public category: any;
  public timeline: any;
  public fecha: any;
  public professionalData: any;
  public appointmentId: any;
  public url: string;
  public antecedentes: any;
  public antecedentesGeneral: any;
  public exams: any;
  public signos: FormGroup;
  public otros: FormGroup;
  public consultasForm: FormGroup;
  public diagnostico: FormGroup;
  public notes: FormGroup;
  public nutricion: FormGroup;
  public permisoGuardar: boolean;
  public fotoUser: any;
  public notesArray: any;
  public jitsiGlobal: any;
  public trustedUrl: SafeResourceUrl;
  public sibrareDocumentId: any;
  public arrayDocuments: any;
  public urlSibrare: any;
  public videoCall: boolean;
  public descargar: boolean;
  public addExamen: FormGroup;
  public base64: any;
  public nameFile: any;
  public textInputFile: any;
  public photoUrlBase = environment.photoUrlBase;
  public elemntoId: string;
  public elemntoValue: string;
  public antecedente: string;
  sicknessIsCollapsed: boolean = true;
  familiarHistoryIsCollapsed: boolean = true;
  healthHabitsIsCollapsed: boolean = true;
  medicinesIsCollapsed: boolean = true;
  occupationalIsCollapsed: boolean = true;
  othersIsCollapsed: boolean = true;
  public addValidator: boolean;
  public modelAntecedente: any;
  public intervalGlobal: any;

  public sicknessByProfessional: any;
  public allergiesByProfessional: any;
  public surgicalInterventionsByProfessional: any;
  public familiarHistoryByProfessional: any;
  public healthHabitsByProfessional: any;
  public medicinesByProfessional: any;
  public occupationalByProfessional: any;
  public othersByProfessional: any;
  public search: boolean;
  public searchInput: any;
  public searchResponse: any;
  public searchDisplay: boolean;
  public spinnerSearch: boolean;
  public searchFormcontrol: boolean;
  public arrayDiagnostic = [];
  public arrayDiagnostic2 = [];
  public preArray = []
  private alive: boolean;

  constructor(
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private router: Router,
    private medicalRecordService: MedicalRecordService,
    private _formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private domSanitizer: DomSanitizer,
    private adminitrativeService: AdminitrativeService,
    private translateService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.alive = true;
    this.search = false;
    this.textInputFile = 'seleccionar archivo';
    this.spinner.show();
    this.permisoGuardar = false;
    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      this.appointmentId = params.appointmentId;
      this.getAppointmentsDetails(id);
      this.setAppointmentsDetails(id);
      this.getAppointmentsProfessionalData(id);
      this.getAntecedentByProfessional(this.appointmentId);
    });

    $('#fichaConsulta').on('hidden.bs.modal', function () {
      this.clearId();
    })

    $('.responseSearch').mouseout(function () {
      $(this).css('display', 'none');
      this.searchDisplay = false;
    });

    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext,
      JSON.parse(localStorage.getItem('currentUser')).role
    );

    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();
    this.getFecha();

    this.signos = this._formBuilder.group({
      PAS: [''],
      PAD: [''],
      PAmedia: [''],
      FC: [''],
      FR: [''],
      Temp: [''],
      Sat: [''],
    },{ updateOn: 'blur' });

    this.otros = this._formBuilder.group({
      physicalExam: [''],
      examHighlights: [''],
    },{ updateOn: 'blur' });

    this.nutricion = this._formBuilder.group({
      weight: [''],
      height: [''],
      imc: [''],
      imcClassification: [''],
    },{ updateOn: 'blur' });

    this.consultasForm = this._formBuilder.group({
      motive: [''],
      objective: [''],
      anamnesis: [''],
    },{ updateOn: 'blur' });

    this.diagnostico = this._formBuilder.group({
      plan: [''],
      diagnostic: ['',], // 
      type: ['cie10', Validators.required],
      comments: ['', Validators.required],
      indications: ['', Validators.required],
    },{ updateOn: 'blur' });

    this.notes = this._formBuilder.group({
      notes: [''],
    },{ updateOn: 'blur' });

    this.addExamen = this._formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      data: [null, [Validators.required]],
    },{ updateOn: 'blur' });
    
    
    this.consultasForm.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    this.signos.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    this.otros.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    this.nutricion.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    this.diagnostico.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    this.notes.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    this.addExamen.valueChanges.subscribe(() => {
      this.putAppointment( this.appointmentId)
    });
    
    /*
    this.consultasForm.updateOn.pipe(takeWhile (() => this.alive)). subscribe ((estado) => {
      console.log (estado);
      this.putAppointment( this.appointmentId);
    });*/
    /*
    this.consultasForm.statusChanges()
    .takeWhile(this.alive) //
    .subscribe((status) => {
      // 
    });*/
  }
  
  clearId(){
    this.idConsulta = null
  }

  enviarId(id) {
    console.log(id);
    this.idConsulta = id;
  }

  //autoSave
  autoSave(event){
    console.log(event)
  }

  typeDiagnostic() {
    this.search = true;
  }

  selectDiagnostico(item) { 
    this.preArray.push({
      display:item.display,
      _id: item._id,
      type: 'cie10'
    })
    this.arrayDiagnostic = this.preArray.filter((valorActual, indiceActual, arreglo) => {
      return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    });
  }

  deleteDiagnostic(_id){
    this.arrayDiagnostic = this.arrayDiagnostic.filter(item => item._id !== _id);
    this.arrayDiagnostic2 =  [...this.arrayDiagnostic.filter(item => item._id !== _id)]; 
    console.log(this.arrayDiagnostic);
  }

  //buscador de diagnostico
  onChangeSearch(event) {
    //this.arrayDiagnostic =   this.arrayDiagnostic2;
    console.log(this.searchFormcontrol);
    if (event && event.length >= 2 ) {
      this.spinnerSearch = true;
      setTimeout(() => {
        console.log('busqueda activada', event);
        this.adminitrativeService.searchDiagnostic('cie10', event).subscribe(
          (data) => { 
            //this.searchFormcontrol = true
            this.spinnerSearch = false;
            this.searchDisplay = true;
            this.searchResponse = data.payload;
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      }, 600);
    } else {
      console.log('busqueda inactiva', event);
    }
  }

  //update appointmentDetails
  putAppointment(appointmentId) {
    //console.log(this.signos);
    let appointmentObject = {
      patientDetails: {
        vitalSigns: this.signos.value,
        nutritionalState: this.nutricion.value,
      },
      appointmentDetails: {
        diagnosticDetails: {
          //type: this.diagnostico.controls.type.value,
          diagnostics: this.arrayDiagnostic,
          comments: this.diagnostico.controls.comments.value,
          indications: this.diagnostico.controls.indications.value,
        },
        motive: this.consultasForm.controls.motive.value,
        objective: this.consultasForm.controls.objective.value,
        anamnesis: this.consultasForm.controls.anamnesis.value,
        physicalExam: this.otros.controls.physicalExam.value,
        examHighlights: this.otros.controls.examHighlights.value,
        plan: this.diagnostico.controls.plan.value
      },
    };
    //console.log(appointmentObject);
    this.appointmentsService.putAppointment(appointmentId, appointmentObject).subscribe(
      (data) => {
        //console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update appointmentDetails
  putNotes(appointmentId) {
    console.log(this.notes.controls.notes.value);
    let appointmentObject = {
      appointmentDetails: {
        notes: this.notes.controls.notes.value,
      },
    };
    this.appointmentsService.putAppointment(appointmentId, appointmentObject).subscribe(
      (data) => {
        console.log(data);
        this.appointmentsService.getAppointmentsDetails(appointmentId).subscribe(
          (data) => {
            console.log(data.payload.appointmentDetails.notes);
            this.notesArray = data.payload.appointmentDetails.notes;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  stopInterval() {
    //clearInterval(thisinterval);
  }

  subirPrescripciones(type) {
    this.spinner.show();
    this.trustedUrl = '';
    //verificar estado documento
    this.appointmentsService.getSibrareUrl(this.appointmentId, type).subscribe(
      (data) => {
        this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.payload.requestUrl);
        console.log(data);
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
        this.sibrareDocumentId = data.payload.documentId;
        console.log(this.sibrareDocumentId);
        console.log(this.appointmentId);
        let interval = setInterval(() => {
          this.appointmentsService.getSibrareStatus(this.appointmentId, this.sibrareDocumentId).subscribe(
            (data) => {
              if (data.payload.isVerified === true) {
                this.descargar = false;
                console.log(data);
                clearInterval(interval);
                this.getVerifiedSibrareDocuments(this.appointmentId);
              } else {
                console.log(data);
                console.log('no verificado sin documentos');
              }
            },
            (error) => {
              clearInterval(interval);
              console.log(error);
            }
          );
        }, 3500);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  //getVerifiedSibrareDocuments
  getVerifiedSibrareDocuments(appointmentId) {
    this.appointmentsService.getVerifiedSibrareDocuments(this.appointmentId).subscribe(
      (data) => {
        this.descargar = false;
        console.log(data);
        this.arrayDocuments = data.payload;
        this.getSibrareDocuments(this.appointmentId, this.sibrareDocumentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //getVerifiedSibrareDocuments
  getVerifiedSibrareDocuments2(appointmentId) {
    this.appointmentsService.getVerifiedSibrareDocuments(this.appointmentId).subscribe(
      (data) => {
        console.log(data);
        this.arrayDocuments = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadSibrare(documentId) {
    this.descargar = true;
    this.spinner.show();
    console.log(documentId);
    this.getSibrareDocuments(this.appointmentId, documentId);
  }

  // get documents sibrare
  getSibrareDocuments(id, documentId) {
    this.appointmentsService.getSibrareDocumentUrl(id, documentId).subscribe(
      (data) => {
        this.urlSibrare = data.payload[0].documento;
        console.log(this.urlSibrare);
        console.log(data);
        this.spinner.hide();
        if (this.descargar === true) {
          return window.open(this.urlSibrare);
        } else {
          console.log(this.urlSibrare);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMedicalRecord(id) {
    this.medicalRecord.getByUserId(id).subscribe(
      (data) => {
        console.log(data);
        this.exams = data.payload.exams;
        this.antecedentesGeneral = data.payload.antecedent;
        this.antecedentes = data.payload.antecedent.sickness;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAntecedentByProfessional(appointmentId) {
    this.appointmentsService.getAntecedentByProfessional(appointmentId).subscribe(
      (data) => {
        console.log(data);
        this.sicknessByProfessional = data.payload.sickness;
        this.allergiesByProfessional = data.payload.allergies;
        this.surgicalInterventionsByProfessional = data.payload.surgicalInterventions;
        this.familiarHistoryByProfessional = data.payload.familiarHistory;
        this.healthHabitsByProfessional = data.payload.healthHabits;
        this.medicinesByProfessional = data.payload.medicines;
        this.occupationalByProfessional = data.payload.occupational;
        this.othersByProfessional = data.payload.others;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAntecedentByProfessional(appointmentId) {
    this.appointmentsService.getAntecedentByProfessional(appointmentId).subscribe(
      (data) => {
        console.log(data);
        this.sicknessByProfessional = data.payload.sickness;
        this.allergiesByProfessional = data.payload.allergies;
        this.surgicalInterventionsByProfessional = data.payload.surgicalInterventions;
        this.familiarHistoryByProfessional = data.payload.familiarHistory;
        this.healthHabitsByProfessional = data.payload.healthHabits;
        this.medicinesByProfessional = data.payload.medicines;
        this.occupationalByProfessional = data.payload.occupational;
        this.othersByProfessional = data.payload.others;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetValue() {
    this.textInputFile = 'seleccionar archivo';
  }

  addExamenPost() {
    console.log(this.userId);
    const formObject = {
      name: this.nameFile,
      type: this.addExamen.controls.type.value,
      file: this.base64.split(',')[1],
    };
    this.putAddExamen(formObject, this.userId);
  }

  putAddExamen(object, id: string) {
    this.medicalRecordService.putAddExamen(object, id).subscribe(
      (data) => {
        console.log(data);
        this.getAppointmentsDetailsRefresh(this.appointmentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openFile(event) {
    const file = event.target.files[0];
    this.nameFile = event.target.files[0].name;
    this.textInputFile = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.base64 = reader.result;
      this.base64.split(',')[1];
      console.log(this.base64.split(',')[1]);
    };
  }

  getSession(id: string) {
    this.appointmentsService.getAppointmentsSession(id).subscribe(
      (data) => {
        console.log(data);
        this.url = data.payload.urlRoom;
        const options = {
          roomName: data.payload.sessionId,
          jwt: data.payload.sessionToken,
          //height: 500,
          //width:'auto',
          parentNode: document.querySelector('#meet'),
        };
        this.url = data.payload.urlRoom.split('//');
        this.jitsiGlobal = new (window as any).JitsiMeetExternalAPI(this.url[1].replace('/', ''), options);
        this.jitsiGlobal.executeCommand('subject', 'Consulta');
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFecha() {
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });
    this.fecha = {
      year: fecha.getFullYear(),
      month: month,
    };
  }

  getAppointmentsTimeline(id) {
    this.appointmentsService.getAppointmentsTimelineUser(id).subscribe(
      (data) => {
        this.timeline = data.payload;
        console.log(this.timeline);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  runAppointment(appointmentId, event) {
    this.appointmentsService.postEventAppointment(appointmentId, event).subscribe(
      (data) => {
        this.videoCall = true;
        console.log(data);
        this.getAppointmentsDetails(appointmentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  endTeleconsultation(appointmentId, event) {
    this.videoCall = false;
    $('#meet').remove();
    /*this.jitsiGlobal.excutecommnad( 'hangup');
    this.jitsiGlobal.dispose();*/
    //$("#meet").remove();
    this.appointmentsService.postEventAppointment(appointmentId, event).subscribe(
      (data) => {
        console.log(data);
        this.getAppointmentsDetailsRefresh(appointmentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  finish(appointmentId, event) {
    this.appointmentsService.postEventAppointment(appointmentId, event).subscribe(
      (data) => {
        console.log(data);
        this.getAppointmentsDetails(appointmentId);
        this.router.navigate(['/app-professional']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointmentsProfessionalData(id) {
    this.appointmentsService.getAppointmentsProfessionalData(id).subscribe(
      (data) => {
        this.professionalData = data.payload;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async setAppointmentsDetails(id){
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      data => {
        this.consultasForm.controls['motive'].setValue(data.payload.appointmentDetails.motive);
        this.consultasForm.controls['objective'].setValue(data.payload.appointmentDetails.objective);
        this.consultasForm.controls['anamnesis'].setValue(data.payload.appointmentDetails.anamnesis);

        this.otros.controls['physicalExam'].setValue(data.payload.appointmentDetails.physicalExam);
       
        this.otros.controls['examHighlights'].setValue(data.payload.appointmentDetails.examHighlights);

        this.signos.controls['PAS'].setValue(data.payload.patientDetails.vitalSigns.PAS);
        this.signos.controls['PAD'].setValue(data.payload.patientDetails.vitalSigns.PAD);
        this.signos.controls['PAmedia'].setValue(data.payload.patientDetails.vitalSigns.PAmedia);
        this.signos.controls['FC'].setValue(data.payload.patientDetails.vitalSigns.FC);
        this.signos.controls['FR'].setValue(data.payload.patientDetails.vitalSigns.FR);
        this.signos.controls['Temp'].setValue(data.payload.patientDetails.vitalSigns.Temp);
        this.signos.controls['Sat'].setValue(data.payload.patientDetails.vitalSigns.Sat);

        this.nutricion.controls['weight'].setValue(data.payload.patientDetails.nutritionalState.weight);
        this.nutricion.controls['height'].setValue(data.payload.patientDetails.nutritionalState.height);
        this.nutricion.controls['imc'].setValue(data.payload.patientDetails.nutritionalState.imc);
        this.nutricion.controls['imcClassification'].setValue(data.payload.patientDetails.nutritionalState.imcClassification);

        this.diagnostico.controls['plan'].setValue(data.payload.appointmentDetails.plan);
        this.diagnostico.controls['comments'].setValue(data.payload.appointmentDetails.diagnosticDetails.comments);
        this.diagnostico.controls['indications'].setValue(data.payload.appointmentDetails.diagnosticDetails.indications);
      }
    )
  }

  getAppointmentsDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.getVerifiedSibrareDocuments2(id);
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId;
        this.getAppointmentsTimeline(this.userId);
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo;
        this.arrayDiagnostic = data.payload.appointmentDetails.diagnosticDetails.diagnostics;
        console.log(this.arrayDiagnostic)
        this.notesArray = data.payload.appointmentDetails.notes;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId);
        

        console.log(this.appointmentDetail);
        if (this.appointmentDetail.administrativeDetails.status === 'running') {
          this.getSession(id);
          this.permisoGuardar = true;
          this.videoCall = true;

          //modo flotante video call
          $(window).bind('scroll', function () {
            if ($(window).scrollTop() > 200) {
              $('.vistaFixed').addClass('fixed');
              $('.mtfixed').css('margin-top', 400);
              $('.vistaFixed .card').css('box-shadow', 'none !important');
            } else {
              $('.toolbox-icon').click();
              console.log('no fixed');
              $('.mtfixed').css('margin-top', 0);
              $('.vistaFixed').removeClass('fixed');
            }
          });
        }
        if (this.appointmentDetail.administrativeDetails.status === 'pending') {
          this.permisoGuardar = true;
        }
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointmentsDetailsRefresh(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId;
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo;
        this.notesArray = data.payload.appointmentDetails.notes;
        this.arrayDiagnostic = data.payload.appointmentDetails.diagnosticDetails.diagnostics;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId);
        console.log(this.appointmentDetail);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //antecedentes//

  categoryChangue(category?) {
    this.addValidator = false;
    console.log(category);
    this.modelAntecedente = '';
    this.category = category;
  }

  add(category) {
    console.log(this.modelAntecedente);
    this.putAddAntecedent(category, this.modelAntecedente);
  }

  putAddAntecedent(antecedent, object) {
    this.appointmentsService.addAntecedentByProfessional(this.appointmentId, antecedent, object).subscribe(
      (data) => {
        console.log(data);
        this.category = '';
        this.getAntecedentByProfessional(this.appointmentId);
        this.getAppointmentsDetailsRefresh(this.appointmentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete() {
    this.appointmentsService.deleteAntecedentes(this.appointmentId, this.antecedente, this.elemntoId).subscribe(
      (data) => {
        console.log(data);
        this.getAppointmentsDetailsRefresh(this.appointmentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteByProfessional() {
    this.appointmentsService
      .deleteAntecedentesByProfessional(this.appointmentId, this.antecedente, this.elemntoId)
      .subscribe(
        (data) => {
          console.log(data);
          this.getAppointmentsDetailsRefresh(this.appointmentId);
          this.getAntecedentByProfessional(this.appointmentId);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //borrar antecedente
  preDelete(item, event) {
    let antecedent = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(antecedent);
    this.antecedente = antecedent;
    this.elemntoId = item.id;
    this.elemntoValue = item.value;
  }

  //Calcular Indice de Masa Corporal
  imcCalculate(){
    //Obtengo el valor de la altura y el peso
    let weight = this.nutricion.controls['weight'].value || 0;
    let height = this.nutricion.controls['height'].value || 0.1;
    // formula para el calculo
    let imc = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))).toFixed(2);
    //seteo el valor dependiendo de la medida
    this.nutricion.controls['imc'].setValue(imc);
    if(parseFloat(imc) < 18.50){
      let bajo = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.low')
      this.nutricion.controls['imcClassification'].setValue(bajo);
    }else if(parseFloat(imc) >= 18.50 && parseFloat(imc) < 25){
      let normal = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.normal')
      this.nutricion.controls['imcClassification'].setValue(normal);
    }else if(parseFloat(imc) >= 25 && parseFloat(imc) < 30){
      let above = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.over')
      this.nutricion.controls['imcClassification'].setValue(above);
    }else if(parseFloat(imc) >= 30 && parseFloat(imc) < 35){
      let type1 = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.type1')
      this.nutricion.controls['imcClassification'].setValue(type1);
    }else if(parseFloat(imc) >= 35 && parseFloat(imc) < 40){
      let type2 = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.type2')
      this.nutricion.controls['imcClassification'].setValue(type2);
    }else {
      let type3 = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.type3')
      this.nutricion.controls['imcClassification'].setValue(type3);
    }
  }








}

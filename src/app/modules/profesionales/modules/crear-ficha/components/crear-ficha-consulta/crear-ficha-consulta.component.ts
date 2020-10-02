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




declare var $: any;

@Component({
  selector: 'app-crear-ficha-consulta',
  templateUrl: './crear-ficha-consulta.component.html',
  styleUrls: ['./crear-ficha-consulta.component.scss'],
})
export class CrearFichaConsultaComponent implements OnInit {
  public idConsulta:any;
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
  public videoCall:boolean;
  public descargar:boolean;
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
  public intervalGlobal:any

  public familiarHistoryByProfessional:any;
  public healthHabitsByProfessional:any;
  public medicinesByProfessional:any;
  public occupationalByProfessional:any;
  public othersByProfessional:any;
  public sicknessByProfessional:any;

  constructor(
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private router: Router,
    private medicalRecordService: MedicalRecordService,
    private _formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.textInputFile = 'seleccionar archivo';
    this.spinner.show();
    this.permisoGuardar = false;
    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      this.appointmentId = params.appointmentId;
      console.log(params);
      this.getAppointmentsDetails(id);
      this.getAppointmentsProfessionalData(id);
      this.getAntecedentByProfessional(this.appointmentId)
   
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
    });

    this.otros = this._formBuilder.group({
      physicalExam: [''],
      examHighlights: [''],
      plan: [''],
    });

    this.nutricion = this._formBuilder.group({
      weight: [''],
      height: [''],
      imc: [''],
      imcClassification: [''],
    });

    this.consultasForm = this._formBuilder.group({
      motive: [''],
      objective: [''],
      anamnesis: [''],
    });

    this.diagnostico = this._formBuilder.group({
      diagnostic: ['', Validators.required],
      type: ['', Validators.required],
      comments: ['', Validators.required],
      indications: ['', Validators.required]
    });

    this.notes = this._formBuilder.group({
      notes: [''],
    });

    this.addExamen = this._formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      data: [null, [Validators.required]],
    });
  }

  enviarId(id){
    console.log(id)
    this.idConsulta = id;
  }

  //update appointmentDetails
  putAppointment(appointmentId) {
    console.log(this.signos);
    let appointmentObject = {
      patientDetails: {
        vitalSigns: this.signos.value,
        nutritionalState: this.nutricion.value,
      },
      appointmentDetails: {
        diagnosticDetails: {
          type: this.diagnostico.controls.type.value,
          diagnostic: this.diagnostico.controls.diagnostic.value,
          comments: this.diagnostico.controls.comments.value,
          indications: this.diagnostico.controls.indications.value,
        },
        motive: this.consultasForm.controls.motive.value,
        objective: this.consultasForm.controls.objective.value,
        anamnesis: this.consultasForm.controls.anamnesis.value,
        physicalExam: this.otros.controls.physicalExam.value,
        examHighlights: this.otros.controls.examHighlights.value,
        plan: this.otros.controls.plan.value,
      },
    };
    console.log(appointmentObject);
    this.appointmentsService.putAppointment(appointmentId, appointmentObject).subscribe(
      (data) => {
        console.log(data);
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

  stopInterval(){
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
        //console.log(this.appointmentId);
        setTimeout(() => {
          //<<<---using ()=> syntax
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
          ); /**/
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
        //window.location.href= this.urlSibrare ;
        console.log(this.urlSibrare);
        console.log(data);
        this.spinner.hide();
        if(this.descargar === true){     
          return  window.open(this.urlSibrare);
        }else{
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
        this.familiarHistoryByProfessional = data.payload.familiarHistory;
        this.healthHabitsByProfessional = data.payload.healthHabits;
        this.medicinesByProfessional = data.payload.medicines;
        this.occupationalByProfessional = data.payload.occupational;
        this.othersByProfessional = data.payload.others;
        this.sicknessByProfessional = data.payload.sickness;
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
        this.familiarHistoryByProfessional = data.payload.familiarHistory;
        this.healthHabitsByProfessional = data.payload.healthHabits;
        this.medicinesByProfessional = data.payload.medicines;
        this.occupationalByProfessional = data.payload.occupational;
        this.othersByProfessional = data.payload.others;
        this.sicknessByProfessional = data.payload.sickness;
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
    this.videoCall = false
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

  getAppointmentsDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.getVerifiedSibrareDocuments2(id);
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId;
        this.getAppointmentsTimeline(this.userId);
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo;
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
               $(".mtfixed").css('margin-top',400);
               $(".vistaFixed .card").css('box-shadow','none !important');
              
            } else {
              $('.toolbox-icon').click();
              console.log('no fixed')
              $(".mtfixed").css('margin-top',0);
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
    //console.log(category);
    this.category = category;
    //return category
  }

  /*
  hasAntecedents(antecedent, boolean) {
    this.medicalRecordService(antecedent, boolean).subscribe(
      (data) => {
        this.medicalRecordService.getByUserId().subscribe((data) => {
          this.exams = data.payload.exams;
          this.antecedentes = data.payload.antecedent;
        });
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }*/
  
  add(category){
    console.log(this.modelAntecedente);
    this.putAddAntecedent(category, this.modelAntecedente);
  }
  
  putAddAntecedent(antecedent, object){
    this.appointmentsService.addAntecedentByProfessional(this.appointmentId, antecedent, object).subscribe(
      data => {
        console.log(data);
        this.category = '';
        this.getAntecedentByProfessional(this.appointmentId) 
        this.getAppointmentsDetailsRefresh(this.appointmentId);
      },
      error => {
        console.log(error)
      }
    )
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
    this.appointmentsService.deleteAntecedentesByProfessional(this.appointmentId, this.antecedente, this.elemntoId).subscribe(
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



}

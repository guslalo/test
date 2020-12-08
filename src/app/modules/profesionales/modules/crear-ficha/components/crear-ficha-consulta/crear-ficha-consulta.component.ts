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
import { NgxPermissionsService } from 'ngx-permissions';
import { DestiniesService } from 'src/app/services/destinies.service';

import { IdleEventsService } from '../../../../../../services/idle-events.service';

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
  public formAddGesEno: FormGroup;
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
  public allergies: any;

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
  public objectDiagnostic = {};
  public preArray = []
  private alive: boolean;
  public destinies: any;
  public destiniesSelected = [];
  public destiniesToSave = [];

  public videoCallStatus: any;
  public setup: string;

  public objetives: any;
  public notifiableDiseases = [];

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
    private translateService: TranslocoService,
    private NgxPermissionsService: NgxPermissionsService,
    private destinyService: DestiniesService,
    private idleEvents: IdleEventsService
  ) { }

  ngOnChanges() {

  }

  ngOnDestroy(): void {
    this.idleEvents.inVideoCall(false)
  }

  ngOnInit(): void {
    this.objectDiagnostic = {
      _id: null,
      isGES: null,
      isENO: null,
      display: null
    }
    this.setup = environment.setup

    console.log(this.setup)

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
      this.getDestinies();
    });

    $('#fichaConsulta').on('hidden.bs.modal', function () {
      this.clearId();
    })

    // $('.responseSearch').mouseout(function () {
    //   $(this).css('display', 'none');
    //   this.searchDisplay = false;
    // });

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
    }, { updateOn: 'blur' });

    this.otros = this._formBuilder.group({
      physicalExam: [''],
      examHighlights: [''],
    }, { updateOn: 'blur' });

    this.formAddGesEno = this._formBuilder.group({
      page: [''],
      diagnostic: [''],
      type: [''],
      observations: [''],
    }, { updateOn: 'blur' });

    this.nutricion = this._formBuilder.group({
      weight: [''],
      height: [''],
      imc: [''],
      imcClassification: [''],
    }, { updateOn: 'blur' });

    this.consultasForm = this._formBuilder.group({
      motive: [''],
      objective: [''],
      anamnesis: [''],
    }, { updateOn: 'blur' });

    this.diagnostico = this._formBuilder.group({
      plan: ['', { updateOn: 'blur' }],
      diagnostic: ['',], // Validators.required
      type: ['cie10',], //Validators.required
      comments: ['', { updateOn: 'blur' }], //Validators.required
      indications: ['', { updateOn: 'blur' }],
      destinies: ['',],
    });

    this.notes = this._formBuilder.group({
      notes: [''],
    });

    this.addExamen = this._formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      data: [null, [Validators.required]],
    });

    this.getObjetives()
  }

  saveAppointment(appointmentObject) {
    console.log(appointmentObject)
    this.appointmentsService.putAppointment(this.appointmentId, appointmentObject).subscribe(
      (data) => {
        if (environment.production === false) {
          //console.log(data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearId() {
    this.idConsulta = null
  }

  enviarId(id) {
    console.log(id);
    this.idConsulta = id;
  }

  //autoSave
  autoSave() {

    //consultas form
    this.consultasForm.valueChanges.subscribe((data) => {
      if (this.consultasForm.controls.motive.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            motive: this.consultasForm.controls.motive.value
          }
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.consultasForm.controls.objective.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            objective: this.consultasForm.controls.objective.value
          }
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.consultasForm.controls.anamnesis.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            anamnesis: this.consultasForm.controls.anamnesis.value
          }
        };
        this.saveAppointment(appointmentObject);
      }
    });

    //signos
    this.signos.valueChanges.subscribe((data) => {
      if (this.signos.controls.PAS.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              PAS: this.signos.controls.PAS.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.signos.controls.PAD.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              PAD: this.signos.controls.PAD.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.signos.controls.PAmedia.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              PAmedia: this.signos.controls.PAmedia.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.signos.controls.FC.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              FC: this.signos.controls.FC.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.signos.controls.FR.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              FR: this.signos.controls.FR.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.signos.controls.Temp.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              Temp: this.signos.controls.Temp.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.signos.controls.Sat.value != null) {
        let appointmentObject = {
          patientDetails: {
            vitalSigns: {
              Sat: this.signos.controls.Sat.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
    });

    //nutricion
    this.nutricion.valueChanges.subscribe(() => {
      if (this.nutricion.controls.weight.value != null) {
        let appointmentObject = {
          patientDetails: {
            nutritionalState: {
              weight: this.nutricion.controls.weight.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.nutricion.controls.height.value != null) {
        let appointmentObject = {
          patientDetails: {
            nutritionalState: {
              height: this.nutricion.controls.height.value
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
    });

    this.otros.valueChanges.subscribe(() => {
      if (this.otros.controls.physicalExam.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            physicalExam: this.otros.controls.physicalExam.value
          },
        };
        this.saveAppointment(appointmentObject);
      }
      if (this.otros.controls.examHighlights.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            examHighlights: this.otros.controls.examHighlights.value
          },
        };
        this.saveAppointment(appointmentObject);
      }
    });

    this.diagnostico.get('plan').valueChanges.subscribe(x => {
      if (this.diagnostico.controls.plan.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            plan: this.diagnostico.controls.plan.value
          },
        };
        this.saveAppointment(appointmentObject);
      }
    }
    );

    //diagnostico
    this.diagnostico.valueChanges.subscribe((data) => {
      //console.log(data);
      if (this.diagnostico.controls.comments.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            diagnosticDetails: {
              comments: this.diagnostico.controls.comments.value,
              diagnostics: this.arrayDiagnostic
            }

          },
        };
        this.saveAppointment(appointmentObject);
      }

      /*
      if(this.diagnostico.controls.diagnostics.value  != null){
        let appointmentObject = {
          appointmentDetails: {
            diagnosticDetails: {
              diagnostics: this.arrayDiagnostic
            }
            
          },
        };
        this.saveAppointment(appointmentObject);
      }*/

      if (this.diagnostico.controls.indications.value != null) {
        let appointmentObject = {
          appointmentDetails: {
            diagnosticDetails: {
              indications: this.diagnostico.controls.indications.value,
              diagnostics: this.arrayDiagnostic
            }
          },
        };
        this.saveAppointment(appointmentObject);
      }
    }
    );


  }

  typeDiagnostic() {
    this.search = true;
  }

  selectDiagnostico(item) {

    if (environment.setup === 'CL') {
      if (item.isGES === true) {
        // console.log(item)

        $('#addNotificationGes').modal('show')
      }
      if (item.isENO === true) {
        // console.log(item)

        $('#addNotificationEno').modal('show')
      }
      if (item.isENO === true && item.isGES === true) {
        // console.log(item)

        $('#addNotificationGesEno').modal('show')
      }

      let _i = this.notifiableDiseases.map((e) => {
        return e.diagnostic._id
      }).indexOf(item._id);

      if (_i >= 0) return

      this.notifiableDiseases.push({
        isENO: item.isENO,
        isGES: item.isGES,
        diagnostic: item,
      })

      this.arrayDiagnostic.push({
        display: item.display,
        _id: item._id,
        type: 'cie10',
        isENO: item.isENO,
        isGES: item.isGES
      })

      // this.updateModelNotifiableDiseases()
    } else {
      // setup BR

      let _i = this.arrayDiagnostic.map((e) => {
        return e._id
      }).indexOf(item._id);

      if (_i >= 0) return

      item.type = 'cie10'
      this.arrayDiagnostic.push(item)

      this.updateModelDiagnostics()
    }

    // this.objectDiagnostic = item;

    // console.log(item)

    // this.objectDiagnostic = {
    //   _id: item._id,
    //   isGES: item.isGES,
    //   isENO: item.isENO,
    //   display: item.display
    // }

    // this.arrayDiagnostic.push({
    //   display: item.display,
    //   _id: item._id,
    //   type: 'cie10',
    //   isENO: item.isENO,
    //   isGES: item.isGES
    // })

    // this.updateModelDiagnostics()
  }

  nextStep(type) {
    if (type === 'eno') {
      window.open('https://epivigila.minsal.cl/', "_blank");
      $('#addEno').modal('hide')
      $('#addGesEno').modal('show')
    }
    if (type === 'ges') {
      $('#addGesEno').modal('show')
      $('#addGes').modal('hide')
    }
  }

  addRegistryGesEno() {
    //let DataisENO = this.objectDiagnostic.isENO

    this.updateModelNotifiableDiseases()

    // let appointmentObject = {
    //   appointmentDetails: {
    //     notifiableDiseases: [
    //       {
    //         diagnostic: this.objectDiagnostic,
    //         professionaId: '5f580599fd059702a80d14d1',
    //         page: this.formAddGesEno.controls.page.value,
    //         observations: this.formAddGesEno.controls.observations.value
    //       }
    //     ]
    //   },
    // };
    /*
            isENO: true,
            isGES: false,
    */
    // this.saveAppointment(appointmentObject);
    this.getAppointmentsDetails(this.appointmentId)
  }

  updateModelDiagnostics() {
    if (this.arrayDiagnostic != null) {
      let appointmentObject = {
        appointmentDetails: {
          diagnosticDetails: {
            diagnostics: this.arrayDiagnostic
          }
        },
      };
      this.saveAppointment(appointmentObject);
    }
  }

  updateModelNotifiableDiseases() {
    this.notifiableDiseases.map((e) => {
      e.professionalId = JSON.parse(localStorage.getItem('currentUser')).id,
        e.page = this.formAddGesEno.getRawValue().page,
        e.type = this.formAddGesEno.getRawValue().type,
        e.observations = this.formAddGesEno.getRawValue().observations
    })

    console.log(this.notifiableDiseases)

    if (this.arrayDiagnostic != null) {
      let appointmentObject = {
        appointmentDetails: {
          notifiableDiseases: this.notifiableDiseases
        },
      };
      this.saveAppointment(appointmentObject);
    }
  }

  displayDiagnosticsSetupBR(_array) {
    this.arrayDiagnostic = _array.map((item) => { return item.diagnostic })
  }

  deleteDiagnostic(_id) {
    if (environment.setup === 'CL') {
      this.notifiableDiseases = this.notifiableDiseases.filter(item => item.diagnostic._id != _id)

      this.displayDiagnosticsSetupBR(this.notifiableDiseases)

      console.log(this.notifiableDiseases, _id)

      this.updateModelNotifiableDiseases()
    } else {
      this.arrayDiagnostic = this.arrayDiagnostic.filter(item => item._id != _id);
      this.updateModelDiagnostics()
    }
  }

  trackItem(index: number, item: any) {
    return item._id
  }

  //buscador de diagnostico
  onChangeSearch(event) {
    //this.arrayDiagnostic =   this.arrayDiagnostic2;
    // console.log(this.searchFormcontrol);

    if (event && event.length >= 2) {
      this.spinnerSearch = true;

      setTimeout(() => {
        console.log('busqueda activada', event);

        this.adminitrativeService.searchDiagnostic('cie10', event).subscribe(
          (data) => {
            //this.searchFormcontrol = true

            this.spinnerSearch = false;
            this.searchDisplay = true;
            this.searchResponse = data.payload;

            console.log('this.searchResponse', this.searchResponse);
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

  onChange(deviceValue) {
    $("#selectSintomaId option:selected").attr('disabled', 'disabled');
    if (this.destiniesSelected.find((element) => element.destinyId == deviceValue.value)) return
    this.destiniesToSave.push(deviceValue.value);
    let selectedDestiny = {
      destinyId: deviceValue.value,
      name: deviceValue.selectedOptions[0].innerText,
    };
    this.destiniesSelected.push(selectedDestiny);
    let appointmentObject = {
      appointmentDetails: {
        patientDestinies: this.destiniesToSave
      },
    };

    this.saveAppointment(appointmentObject)
    this.getAppointmentsDetailsRefresh(this.appointmentId);
  }

  getDestinies() {
    this.destinyService.getDestinies().subscribe(
      (data) => {
        this.destinies = data.payload
      },
      (error) => console.log(error)
    )
  }

  removeDestiny(destino) {
    this.destiniesSelected = this.destiniesSelected.filter((val) => val.destinyId !== destino);
    this.destiniesToSave = [...this.destiniesSelected.filter((val) => val.destinyId !== destino).map(val => val.destinyId)]
    console.log(this.destiniesSelected)
    this.destinyService.deleteDestiny(this.appointmentId, destino).subscribe(data => console.log(data), error => console.log(error));
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
          return window.open(this.urlSibrare, "_blank");
        } else {
          console.log(this.urlSibrare);
        }
        this.videoCall = true;
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
        this.allergies = data.payload.antecedent.allergies;
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

    console.log('getSession')
    console.log('id', id)

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

        this.idleEvents.inVideoCall(true)
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

  async setAppointmentsDetails(id) {
    console.log('setAppointmentsDetails', id)

    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      data => {

        console.log('setAppointmentsDetails => getAppointmentsDetails', data)

        this.consultasForm.controls['motive'].setValue(data.payload.appointmentDetails.motive);
        this.consultasForm.controls['objective'].setValue(data.payload.appointmentDetails.objective);
        this.consultasForm.controls['anamnesis'].setValue(data.payload.appointmentDetails.anamnesis);

        this.otros.controls['physicalExam'].setValue(data.payload.appointmentDetails.physicalExam);
        this.otros.controls['examHighlights'].setValue(data.payload.appointmentDetails.examHighlights);
        /*
        if(
          data.payload.patientDetails.vitalSigns.PAS != null,
          data.payload.patientDetails.vitalSigns.PAD != null,
          data.payload.patientDetails.vitalSigns.PAmedia != null,
          data.payload.patientDetails.vitalSigns.FC != null,
          data.payload.patientDetails.vitalSigns.FR != null,
          data.payload.patientDetails.vitalSigns.Temp != null,
          data.payload.patientDetails.vitalSigns.Sat != null
        ) {
        this.signos.controls['PAS'].setValue(data.payload.patientDetails.vitalSigns.PAS);
        this.signos.controls['PAD'].setValue(data.payload.patientDetails.vitalSigns.PAD);
        this.signos.controls['PAmedia'].setValue(data.payload.patientDetails.vitalSigns.PAmedia);
        this.signos.controls['FC'].setValue(data.payload.patientDetails.vitalSigns.FC);
        this.signos.controls['FR'].setValue(data.payload.patientDetails.vitalSigns.FR);
        this.signos.controls['Temp'].setValue(data.payload.patientDetails.vitalSigns.Temp);
        this.signos.controls['Sat'].setValue(data.payload.patientDetails.vitalSigns.Sat);
        }*/

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

        this.appointmentDetail.appointmentDetails.patientDestinies.forEach(element => {
          this.destiniesSelected.push(element)
        });
      }
    )
  }

  getAppointmentsDetails(id) {

    console.log('getAppointmentsDetails', id)

    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {

        console.log('getAppointmentsDetails => DATA', data)

        this.getVerifiedSibrareDocuments2(id);
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId;
        this.getAppointmentsTimeline(this.userId);
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo;

        if (environment.setup === 'CL') {

          this.displayDiagnosticsSetupBR(data.payload.appointmentDetails.notifiableDiseases)
          this.notifiableDiseases = data.payload.appointmentDetails.notifiableDiseases

        } else {
          this.arrayDiagnostic = data.payload.appointmentDetails.diagnosticDetails.diagnostics;
        }

        console.log(this.arrayDiagnostic)

        this.notesArray = data.payload.appointmentDetails.notes;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId);

        console.log(this.appointmentDetail.administrativeDetails.status)

        if (this.appointmentDetail.administrativeDetails.status === 'running' || this.appointmentDetail.administrativeDetails.status === 'pending') {
          this.permisoGuardar = true;
          this.autoSave();
        } else {
          this.permisoGuardar = false;
        }

        if (this.appointmentDetail.administrativeDetails.status == 'waitingInList') {
          this.attendPatient(id, (data) => {
            // this.appointmentDetail.administrativeDetails.status = 'running'
            this.getSession(id);
            this.permisoGuardar = true;
            this.videoCall = true;

            this.floatVideoCallViewer()

            this.getAppointmentsDetailsRefresh(id)
          })
        }

        if (this.appointmentDetail.administrativeDetails.status == 'running') {
          this.getSession(id);
          this.permisoGuardar = true;
          this.videoCall = true;
          this.floatVideoCallViewer()
        }
        /*
        if (this.appointmentDetail.administrativeDetails.status === 'pending') {
          this.permisoGuardar = true;
        }*/
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  floatVideoCallViewer() {
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

  attendPatient(id, cb) {
    this.appointmentsService.attendAppointmentInmediate(id).subscribe(
      (data) => {
        cb(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointmentsDetailsRefresh(id) {

    console.log('getAppointmentsDetailsRefresh')

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
  imcCalculateFromWeight(event) {
    //Obtengo el valor de la altura y el peso
    let weight = event.srcElement.value || "0";
    let height = this.nutricion.controls['height'].value || "0.1";
    weight = parseFloat(weight.replace(',', '.'))
    height = parseFloat(height.replace(',', '.'))
    // formula para el calculo

    let imc = (weight) / (height * height);
    //seteo el valor dependiendo de la medida
    this.setImc(imc)
  }

  imcCalculateFromHeight(event) {
    //Obtengo el valor de la altura y el peso
    let weight = this.nutricion.controls['weight'].value || "0";
    let height = event.srcElement.value || "0.1";
    weight = parseFloat(weight.replace(',', '.'))
    height = parseFloat(height.replace(',', '.'))
    // formula para el calculo

    let imc = (weight) / (height * height);
    //seteo el valor dependiendo de la medida
    this.setImc(imc)
  }

  setImc(imc: number) {
    this.nutricion.controls['imc'].setValue(imc.toFixed(2));
    if (imc < 18.50) {
      let bajo = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.low')
      this.nutricion.controls['imcClassification'].setValue(bajo);
    } else if (imc >= 18.50 && imc < 25) {
      let normal = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.normal')
      this.nutricion.controls['imcClassification'].setValue(normal);
    } else if (imc >= 25 && imc < 30) {
      let above = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.over')
      this.nutricion.controls['imcClassification'].setValue(above);
    } else if (imc >= 30 && imc < 35) {
      let type1 = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.type1')
      this.nutricion.controls['imcClassification'].setValue(type1);
    } else if (imc >= 35 && imc < 40) {
      let type2 = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.type2')
      this.nutricion.controls['imcClassification'].setValue(type2);
    } else {
      let type3 = this.translateService.translate('clinicalFile.patientData.tabs.summary.nutritional.imcClasification.values.type3')
      this.nutricion.controls['imcClassification'].setValue(type3);
    }
  }


  getObjetives() {
    this.appointmentsService.getObjetives().subscribe((data) => {
      this.objetives = data
    })
  }

}

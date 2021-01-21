import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecordService } from 'src/app/services/medicalRecord.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/users.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DocumentService } from 'src/app/services/document.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { AppointmentsService } from './../../../../services/appointments.service';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.scss'],
})
export class FichaPacienteComponent implements OnInit {
  userId = this.routerAct.snapshot.queryParamMap.get('userId');
  patientRecord: any = [];
  appointmentsRecord: any = [];

  antecedentsRecord: any = [];
  examsRecord: any = [];
  prescriptionsRecord: any = [];
  timelineRecord: any = [];
  identification: any = {};
  ufMap: any = [];
  cityMap: any = [];
  countryMap: any = [];
  public antecedentes: any;
  public antecedentesGeneral: any;


  identificationData: any = {};

  // EXTRAS
  moment: any = moment;
  ColumnMode = ColumnMode;
  downloadUrl: any;
  access_token: any;

  // FILTERS
  tempAppointments: any[] = [];
  searchTerm: string = '';
  appointmentStatusSelected: any = null;
  appointmentDateSelected: NgbDateStruct;
  appointmentCheckBox = 'myAppointments';

  dateAdapter = new CustomDateAdapter();

  public fileForm: FormGroup;
  public base64: any;
  public nameFile: any;
  public textInputFile: any;
  patientAge: any;
  public fecha: any;
  public arrayDocuments: any;
  public descargar: boolean;
  public appointmentId: any;
  public urlSibrare: any;
  public setup: string;


  constructor(
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private userService: UsersService,
    private currentUserService: CurrentUserService,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService,
    private appointmentsService: AppointmentsService
  ) { }
  tomorrow = new Date(2020, 9, 20, 14, 34);

  ngOnInit(): void {
    this.setup = environment.setup;
    console.log(this.userId);
    this.appointmentId = this.userId
    this.getMedicalRecord(this.userId);
    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();

    this.fileForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      data: [null, [Validators.required]],
    });

    this.getFecha();
    
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

    //getVerifiedSibrareDocuments
    getVerifiedSibrareDocuments2(appointmentId) {
      this.appointmentsService.getVerifiedSibrareDocuments(appointmentId).subscribe(
        (data) => {
          console.log(data);
          this.arrayDocuments = data.payload;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    downloadSibrare(appointmentId, documentId) {
      this.descargar = true;
      this.spinner.show();
      console.log(documentId);
      this.getSibrareDocuments(appointmentId, documentId);
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
          //this.videoCall = true;
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
    }

  calcularEdad(birthdate){
    let birthday_arr = birthdate.split("/");
    let birthday_date: Date;
    if(birthday_arr[0].length > 2){
      birthday_date = new Date( parseInt(birthday_arr[0]),parseInt(birthday_arr[1]), parseInt(birthday_arr[2]) );
    }else if(birthday_arr[2].length > 2){
      birthday_date = new Date( parseInt(birthday_arr[2]),parseInt(birthday_arr[1]), parseInt(birthday_arr[0]) );
    }
    let ageDifMs = Date.now() - birthday_date.getTime();
    let ageDate = new Date(ageDifMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    this.patientAge = age;
    return age;
  }

  getMedicalRecord(userId) {
    this.spinner.show();
    this.medicalRecordService.getByUserId(userId).subscribe(
      (data) => {
        console.log('patient', data.payload);
        this.patientRecord = data.payload.patientData;
        this.identificationData = data.payload.patientData.identificationData;
        this.appointmentsRecord = data.payload.appointments;
        this.tempAppointments = [...data.payload.appointments];
        this.antecedentsRecord = data.payload.antecedent;
        this.examsRecord = data.payload.exams;

        console.log(this.appointmentsRecord)
        
        if(environment.setup == 'CL'){
          this.arrayDocuments = data.payload.recemed;
        }else{
          this.arrayDocuments = data.payload.prescriptions;
        }

        this.calcularEdad(data.payload.patientData.personalData.birthdate)

        this.antecedentesGeneral = data.payload.antecedent;
        this.antecedentes = data.payload.antecedent.sickness;
        console.log(data.payload.antecedent);

        this.userService.getStates().subscribe((data) => {
          // console.log(data);
          this.ufMap = data.payload.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});
        });

        this.userService.getCities().subscribe((data) => {
          // console.log(data);
          this.cityMap = data.payload.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});
        });

        this.userService.getCountries().subscribe((data) => {
          // console.log(data);
          this.countryMap = data.payload.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});
        });

        this.getIdentification(this.patientRecord.identificationData);
        // console.log(this.patientRecord.patientData.identificationData);

        this.applyFiltersAppointments();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
    this.medicalRecordService.getTimeline(this.userId).subscribe(
      (data) => {
        this.timelineRecord = data.payload;
        console.log(this.timelineRecord);
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  getIdentification(data) {
    for (const item of Object.keys(data)) {
      if (data[item]) {
        this.identification.type = item;
        this.identification.value = data[item];
      }
    }
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

  uploadFile() {
    console.log(this.fileForm);
    const formObject = {
      name: this.nameFile,
      type: this.fileForm.controls.type.value.toString(),
      file: this.base64.split(',')[1],
    };
    this.medicalRecordService.putAddExamen(formObject, this.userId).subscribe(
      (data) => {
        console.log(data);
        this.getMedicalRecord(this.userId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFiltersAppointments() {
    const searchTerm = this.searchTerm.toLowerCase();

    const temp = this.tempAppointments
      // SEARCH FILTER
      .filter((item) => {
        return (
          (item.patientDetails.patientId[0].identificationData.cpf?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.patientId[0].identificationData.cns?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.patientId[0].identificationData.rgRegistry?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.patientId[0].identificationData.passport?.toLowerCase().indexOf(searchTerm)) !== -1 ||
          item.patientDetails.userDetails[0]?.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          item.professionalDetails.userDetails[0]?.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          moment(item.dateDetails.date).format('DD/MM/YYYY').toLowerCase().indexOf(searchTerm) !== -1 ||
          item.dateDetails.start.toLowerCase().indexOf(searchTerm) !== -1 ||
          item.professionalDetails.specialtyDetails[0]?.specialtyName.toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      })
      // STATUS APPOINTMENT FILTER
      .filter((item) => {
        if (this.appointmentStatusSelected) {
          if (item.administrativeDetails.status === this.appointmentStatusSelected) {
            return item;
          }
        } else {
          return item;
        }
      })
      // DATE APPOINTMENT FILTER
      .filter((item) => {
        if (this.appointmentDateSelected) {
          const date = this.dateAdapter.toModel(this.appointmentDateSelected);
          console.log(date, item.dateDetails.date);
          if (moment(item.dateDetails.date).format('YYYY/MM/DD') === date) {
            return item;
          }
        } else {
          return item;
        }
      })
      // CHECKBOX APPOINTMENTS FILTER
      .filter((item) => {
        //console.log(JSON.parse(localStorage.getItem('currentUser')).id, item.professionalDetails.userDetails[0].userId);
        if (this.appointmentCheckBox === 'allAppointments') return item;
        if (this.appointmentCheckBox === 'myAppointments') {
          if (item.professionalDetails.userDetails[0].userId === JSON.parse(localStorage.getItem('currentUser')).id)
            return item;
        }
      });

    this.appointmentsRecord = temp;
    // console.log(temp);
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}

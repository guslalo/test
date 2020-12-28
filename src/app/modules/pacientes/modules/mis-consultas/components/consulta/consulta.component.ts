import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit {
  public appoimentDetail: any;
  public access_token: any;
  public downloadUrl: any;
  public user: any;
  public timeline: any;
  public fecha: any;
  public professionalData: any;
  public inmediate: boolean;
  public arrayDocuments: any;
  public urlSibrare: any;
  public appointmentId: any;
  public descargar: boolean
  public exams: any;
  public antecedentesGeneral: any;
  public allergies: any;
  public antecedentes: any;
  public userId: any;
  public recemed: any;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService,
    private medicalRecordService: MedicalRecordService
  ) { }

  ngOnInit(): void {
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

    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      this.appointmentId = id;
      console.log(params);
      this.getAppointmentsProfessionalData(id);
      this.getAppointmentsDetails(id);

      if(environment.setup == 'CL'){
        let _user = JSON.parse(localStorage.getItem('currentUser'))

        this.getMedicalRecord(_user.id)
      }else{
        this.getVerifiedSibrareDocuments2(id);
      }
    });

    this.getAppointmentsTimeline();
    this.getFecha();

    this.downloadUrl = this.documentService.download();
    this.access_token = JSON.parse(localStorage.getItem('token'));
  }

  getFecha() {
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });

    this.fecha = {
      year: fecha.getFullYear(),
      month: month,
    };

    //console.log(currentMonth);
  }

  getAppointmentsTimeline() {
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      (data) => {
        this.timeline = data.payload;
        console.log(this.timeline);
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
        this.appoimentDetail = data.payload;
        console.log(this.appoimentDetail);

        // this.getMedicalRecord(this.appoimentDetail.patientDetails.userDetails.userId)
        this.userId = this.appoimentDetail.patientDetails.userDetails.userId;

        if (this.appoimentDetail.administrativeDetails.waitingRoomId === null) {
          this.inmediate = false
          this.getAppointmentsProfessionalData(id);
        } else {
          this.inmediate = true;
        }

      },
      (error) => {
        console.log(error);
      }
    );
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

  downloadSibrare(documentId) {
    this.spinner.show();
    this.descargar = true;
    console.log(documentId);
    this.getSibrareDocuments(this.appointmentId, documentId);
  }

  // get documents sibrare
  getSibrareDocuments(id, documentId) {
    this.appointmentsService.getSibrareDocumentUrl(id, documentId).subscribe(
      (data) => {
        this.urlSibrare = data.payload[0].documento;
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
    this.medicalRecordService.getByUserId(id).subscribe(
      (data) => {
        console.log('MEDICAL RECORD', data)
        this.exams = data.payload.exams;
        this.antecedentesGeneral = data.payload.antecedent;
        this.allergies = data.payload.antecedent.allergies;
        this.antecedentes = data.payload.antecedent.sickness;

        if(environment.setup == 'CL'){
          this.arrayDocuments = data.payload.recemed.filter((element)=> element.administrativeDetails.appointmentId == this.appointmentId);
        }else {
          this.arrayDocuments = data.payload.prescriptions;
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}

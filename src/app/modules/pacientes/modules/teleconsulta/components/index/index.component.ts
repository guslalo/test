import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { UserLogin } from './../../../../../../models/models';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public appointmentDetail: any;
  public access_token: any;
  public downloadUrl: any;
  public user: any;
  public timeline: any;
  public fecha: any;
  public professionalData: any;
  public salaEspera: boolean;
  url: string;

  public antecedentes: any;
  public antecedentesGeneral: any;
  public exams: any;
  public userId: any;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private medicalRecord: MedicalRecordService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      console.log(params);
      this.getAppointmentsDetails(params.appointmentId);
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

    this.getAppointmentsTimeline();
    this.getFecha();
    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();
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

  getSession(id) {
    this.appointmentsService.getAppointmentsSession(id).subscribe(
      (data) => {
        console.log(data);
        const options = {
          roomName: data.payload.sessionId,
          jwt: data.payload.sessionToken,
          parentNode: document.querySelector('#meet3'),
        };
        this.url = data.payload.urlRoom.split('//');
        console.log(this.url[1].replace('/', ''));
        const jitsi = new (window as any).JitsiMeetExternalAPI(this.url[1].replace('/', ''), options);
        jitsi.executeCommand('subject', 'Consulta');
        $('.toolbox-icon').find('jitsi-icon').click();
        /*
        jitsi.on('readyToClose', () => {
          console.log ('cerrado');
        });*/
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
        setTimeout(() => {
          this.getSession(id);
        }, 260);
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId;
        if (data.payload.administrativeDetails.waitingRoomId === null) {
          this.salaEspera = false;
          this.getAppointmentsProfessionalData(id);
        } else {
          this.salaEspera = true;
        }
        //console.log(this.appointmentDetail.professionalDetails.userDetails[0].userId)
        //this.getAppointmentsProfessionalData(this.appointmentDetail.professionalDetails.userDetails[0].userId);
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId);
        console.log(this.appointmentDetail);
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
}

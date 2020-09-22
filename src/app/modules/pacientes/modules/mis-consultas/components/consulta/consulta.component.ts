import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';

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

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService
  ) {}

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
      console.log(params);
      this.getAppointmentsDetails(id);
      this.getAppointmentsProfessionalData(id);
    });

    this.getAppointmentsTimeline();
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { HomeService } from 'src/app/services/home.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';
import * as moment from 'moment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})

export class InicioComponent implements OnInit {
  public currentUser: any = {};
  public user: any;
  public tips: any;
  public inmediateAppointment: boolean;
  public scheduleAppointment: boolean;
  public consultasActivas: any;
  public consultas: any;
  public nextAppointed: any;
  public consultasFinalizadas: any;
  public appointment: boolean;
  public page: number = 1;
  public totalPages: number;
  public idCancel: any;

  constructor(
    public currentUserService: CurrentUserService,
    public homeService: HomeService,
    public appointmentsService: AppointmentsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    console.log('PACIENTE')
    this.appointment = true;
    this.getAppointments();
    this.page = 1;
    this.appointmentsService.getTotalPages().subscribe((data) => {
      console.log(data);
      this.totalPages = data.payload.numberOfPages;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

    if (localStorage.getItem('inmediateAppointment') === 'true') {
      this.inmediateAppointment = true;
    } else {
      this.inmediateAppointment = false;
    }

    if (localStorage.getItem('scheduleAppointment') === 'true') {
      this.scheduleAppointment = true;
    } else {
      this.scheduleAppointment = false;
    }

    this.homeService.getTips().subscribe(
      (data) => {
        this.tips = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointments() {
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        console.log(data);

        this.consultas = data.payload.filter((a) => a.administrativeDetails.status !== 'finished' && a.administrativeDetails.status !== 'canceled')
        this.totalPages = this.consultas.length;

        console.log(this.consultas)

        if (this.consultas.length > 0) {
          this.appointment = true;

          let arrayForDate = this.consultas.map((value) => value.dateDetails.date);
          var min = arrayForDate[0];

          arrayForDate.forEach((numero) => {
            if (numero < min) {
              min = numero;
            }
          });

          this.nextAppointed = this.consultas.filter((now) => {
            if (now.dateDetails.date === min) {
              return now
            }
          });

          console.log(this.nextAppointed)

          let finalizadas = data.payload.filter((finished) => finished.administrativeDetails.status === 'finished');

          this.consultasFinalizadas = finalizadas.length;
        } else {
          this.appointment = false
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelarCita(id) {
    this.appointmentsService.postCancelarAppointment(id).subscribe(
      data => {
        this.getAppointments()
      },
      error => {
        console.log(error)
      }
    )
  }

  idForCancel(id) {
    this.idCancel = id;
  }
}

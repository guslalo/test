import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { HomeService } from 'src/app/services/home.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';

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
  public consultasActivas: any;
  public consultas: any;
  public nextAppointed: any;
  public consultasFinalizadas: any;
  public appointment:boolean;
  public page: number = 1;
  public totalPages: number;
  public idCancel:any;

  constructor(
    public currentUserService: CurrentUserService,
    public homeService: HomeService,
    public appointmentsService: AppointmentsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
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
        this.consultas = data.payload;
        if (data.payload.length > 0) {
          this.appointment = true;
          let arrayForDate = data.payload.map((value) => value.dateDetails.date);
          var min = arrayForDate[0];
          arrayForDate.forEach((numero) => {
            if (numero < min) {
              min = numero;
            }
          });
          this.nextAppointed = data.payload.filter((now) => now.dateDetails.date === min);
          let finalizadas = data.payload.filter((finished) => finished.administrativeDetails.status === 'finished');
          this.consultasFinalizadas = finalizadas.length;

          console.log(this.consultas);
          /*var dates = data.payload.map(function(x) { return new Date(x.dateDetails.date); });
          var latest = new Date(Math.max.apply(null,dates));
          var earliest = new Date(Math.min.apply(null,dates));*/
          //this.spinner.hide();
        } else {
          this.appointment = false
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelarCita(id){
    this.appointmentsService.postCancelarAppointment(id).subscribe(
      data => {
        console.log(data);
        this.appointmentsService.getAppointments(1).subscribe(
          (data) => {
            console.log(data);
            this.consultas = data.payload;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error)
      }
    )
  }

  idForCancel(id){
    this.idCancel = id;
  }

  
}

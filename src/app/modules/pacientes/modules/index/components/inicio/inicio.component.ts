import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { HomeService } from 'src/app/services/home.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';

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

  constructor(
    public currentUserService: CurrentUserService,
    public homeService: HomeService,
    public appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
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
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

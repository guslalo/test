import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserLogin } from './../../../../../../models/models';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  public currentUser: any = {};
  public user: any;

  constructor(public currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
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

  }
}

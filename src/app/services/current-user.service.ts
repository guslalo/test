import { Injectable } from '@angular/core';

import { UserLogin } from './../models/models';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public currentUser: any = new UserLogin(
    JSON.parse(localStorage.getItem('currentUser')).id,
    JSON.parse(localStorage.getItem('currentUser')).email,
    JSON.parse(localStorage.getItem('currentUser')).name,
    JSON.parse(localStorage.getItem('currentUser')).lastName,
    JSON.parse(localStorage.getItem('currentUser')).access_token,
    JSON.parse(localStorage.getItem('currentUser')).expires_in,
    JSON.parse(localStorage.getItem('currentUser')).internalCode,
    JSON.parse(localStorage.getItem('currentUser')).administrativeData,
    JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext,
    JSON.parse(localStorage.getItem('currentUser')).role,
    JSON.parse(localStorage.getItem('currentUser')).policies
  );
  public user: any;

  constructor() {
    /*this.currentUser
    return this.user;*/
  }
}

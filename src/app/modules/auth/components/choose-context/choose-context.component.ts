import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../../models/models';

@Component({
  selector: 'app-choose-context',
  templateUrl: './choose-context.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ChooseContextComponent implements OnInit {

  public UserLogin: UserLogin;
  public user: any = { };

  constructor() { }

  ngOnInit(): void {
    this.user  = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData
    );
  }

}

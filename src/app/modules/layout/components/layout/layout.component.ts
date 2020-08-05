import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../services/current-user.service';
import { UserLogin } from '../../../../models/models';
import { slideInAnimation } from '../../../../shared/animations';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  //animations: [ slideInAnimation ]
})
export class LayoutComponent implements OnInit {
  public UserLogin: UserLogin;

  constructor(public currentUser: CurrentUserService) {}
  public user: any;
  public userCurrent: any;

  ngOnInit(): void {
    console.log(this.currentUser);
    //this.user = this.currentUser;
    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext
    );
    console.log(this.user); /**/
  }
}

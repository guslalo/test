import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../services/current-user.service'
import { UserLogin } from '../../../../models/models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public UserLogin: UserLogin;

  constructor(public currentUser: CurrentUserService) { }
  public user:any;
  public userCurrent:any;

  ngOnInit(): void {
    //localStorage.removeItem('currentUser');
    /*
    console.log(this.currentUser);
    this.userCurrent = this.currentUser.currentUser;
    localStorage.setItem('currentUser', JSON.stringify(this.userCurrent));*/
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
  }
}

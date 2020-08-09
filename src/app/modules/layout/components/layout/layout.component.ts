import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../services/current-user.service';
import { UserLogin } from '../../../../models/models';
//import { slideInAnimation } from '../../../../shared/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [ 
    trigger ('sideBarAnimation', [
      state('open', style({
        //backgroundColor: '#000000',
        //transform: 'scale(1.5)'
      })),
      state('closed', style({
        width: '68px',
        padding: '0px'
      })),
      transition('closed => open', animate ('100ms ease-in')),
      transition('open => closed', animate ('100ms ease-out'))
    ]),
    trigger ('sideBarElements', [
      state('open', style({
        //backgroundColor: '#000000',
        //transform: 'scale(1.5)'
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('closed => open', animate ('100ms ease-in')),
      transition('open => closed', animate ('100ms ease-out'))
    ]),
   ]
})
export class LayoutComponent implements OnInit {
  public UserLogin: UserLogin;

  constructor(public currentUser: CurrentUserService) {}
  public user: any;
  public userCurrent: any;
  public state:string = "open"

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
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext,
      JSON.parse(localStorage.getItem('currentUser')).role
    );
    console.log(this.user); /**/
  }

  sideBar(){
    this.state = this.state === 'open' ? 'closed' :'open';
  }
  
  status: boolean = false;
  sideBarMenu(){
    this.status = !this.status;  
  }
}

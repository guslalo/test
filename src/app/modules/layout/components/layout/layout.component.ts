import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../services/current-user.service';
import { UserLogin } from '../../../../models/models';
// import { slideInAnimation } from '../../../../shared/animations';
import { SharedModule } from '../../../../shared/shared.module';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('sideBarAnimation', [
      state(
        'open',
        style({
          // backgroundColor: '#000000',
          // transform: 'scale(1.5)'
        })
      ),
      state(
        'closed',
        style({
          width: '68px',
          padding: '0px',
        })
      ),
      transition('closed => open', animate('100ms ease-in')),
      transition('open => closed', animate('100ms ease-out')),
    ]),
    trigger('sideBarElements', [
      state(
        'open',
        style({
          // backgroundColor: '#000000',
          // transform: 'scale(1.5)'
        })
      ),
      state(
        'closed',
        style({
          display: 'none',
        })
      ),
      transition('closed => open', animate('100ms ease-in')),
      transition('open => closed', animate('100ms ease-out')),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  status_date: any;

  constructor() {
    moment().lang('es');
  }
  public state = 'open';

  status = false;

  ngOnInit(): void {
    this.status_date = `${moment(new Date()).format('LLLL')}`;
  }

  sideBar() {
    this.state = this.state === 'open' ? 'closed' : 'open';
  }
  sideBarMenu() {
    this.status = !this.status;
  }
}

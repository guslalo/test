import { Component, OnInit, OnDestroy } from '@angular/core';
// import { slideInAnimation } from '../../../../shared/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import * as moment from 'moment';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TranslocoService } from '@ngneat/transloco';

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
export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  intervalCurrentTime: any;
  public inmediateAppointment: boolean;
  currentDate: string;
  // public firstAccess:boolean;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private bnIdle: BnNgIdleService,
    private toastr: ToastrService,
    private translateService: TranslocoService
  ) {
    // 20 MINUTES DEFAULT
    this.bnIdle.startWatching(environment.sessionTime).subscribe((res) => {
      if (res) {
        console.log('session expired');
        this.toastr.info(this.translateService.translate('common.user.sessionExpired.label'));

        setTimeout(() => {
          document.location.href = '/';
        }, 3000);
      }
    });
  }

  public state = 'open';
  public inmediateAppointmentPadre: boolean;
  status = false;

  ngOnInit(): void {
    //this.firstAccess = true;

    if (localStorage.getItem('inmediateAppointment') === 'true') {
      this.inmediateAppointmentPadre = true;
      this.inmediateAppointment = true;
    } else {
      this.inmediateAppointmentPadre = false;
      this.inmediateAppointment = false;
    }

    setInterval(() => {
      let currentLang = this.translateService.getActiveLang();
      this.currentDate = moment().locale(currentLang).format('LL') + ' | ' + moment().format('h:mm:ss a');
    }, 500)

    this.breakpointObserver.observe(['(min-width: 640px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        // desktop
      } else {
        //this.state = 'closed'
        // mobile
      }
    });
  }

  sideBar() {
    this.state = this.state === 'open' ? 'closed' : 'open';
  }
  sideBarMenu() {
    this.status = !this.status;
  }

  ngOnDestroy() {
    clearInterval(this.intervalCurrentTime);
  }
}

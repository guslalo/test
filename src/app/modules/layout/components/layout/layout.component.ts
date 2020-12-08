import { Component, OnInit, OnDestroy } from '@angular/core';
// import { slideInAnimation } from '../../../../shared/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import * as moment from 'moment';
// import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TranslocoService } from '@ngneat/transloco';
import { MessagingService } from 'src/app/services/messaging.service';
import { Router } from '@angular/router';


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
  public setup:any;
  // public firstAccess:boolean;

  constructor(
    public breakpointObserver: BreakpointObserver,
    // private bnIdle: BnNgIdleService,
    private toastr: ToastrService,
    private translateService: TranslocoService,
    private webNotfications: MessagingService,
    private router: Router
  ) {
    // 20 MINUTES DEFAULT 
    // this.bnIdle.startWatching(environment.sessionTime).subscribe((res) => {
    //   if (res) {
    //     console.log('session expired');
    //     this.toastr.info(this.translateService.translate('common.user.sessionExpired.label'));

    //     setTimeout(() => {
    //       document.location.href = '/';
    //     }, 10000);
    //   }else {
    //     console.log('reactivado');
    //     this.bnIdle.resetTimer();
    //   }
    // });
  }

  public state = 'closed';
  public inmediateAppointmentPadre: boolean;
  message;
  status = false;
  public nots: Array<any> = []
  ngOnInit(): void {
    //this.firstAccess = true;
    this.setup = environment.setup
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
    this.webNotfications.getNotifications().subscribe((data) => this.nots = data, (error) => console.log(error))
    this.webNotfications.requestPermission()
    this.webNotfications.receiveMessage()
    this.message = this.webNotfications.currentMessage;
    setInterval(() => {
      this.webNotfications.getNotifications().subscribe((data) => {
        let notsArray: Array<any> = data;
        this.nots = notsArray;
        this.nots = this.nots.slice();
      }, (error) => console.log(error))
    }, 10000)
  }
  sideBar() {
    this.state = this.state === 'open' ? 'closed' : 'open';
  }
  sideBarMenu() {
    //$('.boxSidebarMain').css("left":'')
    this.status = !this.status;
  }

  ngOnDestroy() {
    clearInterval(this.intervalCurrentTime);
  }
  trackByItems(index: number, not: any): number { return index; }

  toTheNots(noti: any) {
    let role = JSON.parse(localStorage.getItem('currentUser')).role
    if (noti.data.action == "goToAppointment") {
      if (role == "professional") {
        this.router.navigate([`/app-professional/crear-ficha-consulta`, noti.data.id])
      } else if (role == "patient") {
        this.router.navigate([`/app-paciente/teleconsulta`, noti.data.id])
      }
    } else if (noti.data.action == "goToFinishedAppointment") {
      this.router.navigate(['/app-paciente/mis-consultas/consulta', noti.data.id])
    } else if (noti.data.action == "goToNextAppointments") {
      this.router.navigate(['/app-coordinator/#child1'])
    } else if (noti.data.action == "goToWaitingRoom") {
      this.router.navigate(['/app-coordinator/#child2'])
    }
    this.deleteNot(noti._id)
  }
  deleteNot(id: string) {
    let pos = this.nots.findIndex((element) => element._id == id)
    this.nots.splice(pos, 1)
    this.nots.slice()
    console.log(this.nots);
    this.webNotfications.deleteNotification(id).subscribe((data) => console.log(data), (error) => console.log(error))
  }
}

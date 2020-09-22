import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-consulta2',
  templateUrl: './consulta2.component.html',
  styleUrls: ['./consulta2.component.scss'],
})
export class Consulta2Component implements OnInit {
  changeDetectorRef: ChangeDetectorRef;
  selectedId: any;
  private sub: any;
  id: number;
  public meet: boolean;
  public toggleVideo = false;

  @ViewChild('iniciarLlamada') iniciarLlamada;

  constructor(
    private ref: ChangeDetectorRef,
    private opentokService: OpentokService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService
  ) {
    this.changeDetectorRef = ref;
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }
  @ViewChild('hardwareVideo') hardwareVideo: any;

  _navigator = navigator as any;
  localStream;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // this.id = +params['id']; // (+)
      // get getRutas
      /* */
      // console.log(params.appointmentId);
      if (params.appointmentId === '5f049b9948ab2c55c1db33fa') {
        this.meet = true;

        this.getSessionCall2('5f049b9948ab2c55c1db33fa');

        console.log(this.meet);
      } else {
        this.meet = false;
      }
    });
    this.initCall();
  }

  initCall() {
    console.log(this.meet);
    if (this.meet) {
      // this.getSessionCall2('5f049b9948ab2c55c1db33fa');
    } else {
      this.sub = this.route.params.subscribe((params) => {
        // this.id = +params['id']; // (+)
        // get getRutas
        console.log(params);
        console.log(params.appointmentId);
        this.getSessionCall(params.appointmentId);
      });
    }
  }
  getAppointments() {
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        // this.consultas = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAppointments2(id) {
    this.appointmentsService.getAppointments2(id).subscribe(
      (data) => {
        // this.consultas = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSessionCall(appointmentId) {
    let apiKey: any;
    let token: any;
    let sessionId: any;
  }

  getSessionCall2(appointmentId) {
    let apiKey: any;
    let token: any;
    let sessionId: any;
  }

  closeCall() {
    this.router.navigate(['/app-paciente/mis-consultas']);
  }
}

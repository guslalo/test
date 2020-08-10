import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit {

  changeDetectorRef: ChangeDetectorRef;
  selectedId: any;
  private sub: any;
  id: number;
  public meet: boolean;
  public cita: any;

  constructor(
    private ref: ChangeDetectorRef,
    private opentokService: OpentokService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService
  ) {
    this.changeDetectorRef = ref;
    router.events.forEach((event) => {
   
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit(): void {
 }

   
  

  initCall() {
    console.log(this.meet);
    if (this.meet) {
      //this.getSessionCall2('5f049b9948ab2c55c1db33fa');
    } else {
      this.sub = this.route.params.subscribe((params) => {
        //this.id = +params['id']; // (+)
        //get getRutas
        console.log(params);
        console.log(params.appointmentId);
        this.getSessionCall(params.appointmentId);
      });
    }
  }
  getAppointments() {
    this.appointmentsService.getAppointments().subscribe(
      (data) => {
        //this.consultas = data;
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
        //this.consultas = data;
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

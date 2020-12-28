import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  public nextAppointments = []
  public openAppointments = []
  public immediateAppointments = []
  public interval:any;

  constructor( 
    private router: Router,
    public appointmentsService: AppointmentsService,
    private appointmentsEvents: AppointmentEventsService
  ) { 

  }

  ngOnInit(): void {
    
    this.getAppointmentsForTypes();

    setTimeout(() => {
      this.interval = setInterval(() => {
        this.getAppointmentsForTypes();
       }, 10000);
    }, 0);

    this.router.events.subscribe(value => {
      clearInterval(this.interval);
    });
    
  }

  getAppointmentsForTypes() {
    this.appointmentsService.getAppointmentsForTypes().subscribe(
      (data) => {
        console.log(data)
        this.openAppointments = data.payload.openAppointments
        this.immediateAppointments = data.payload.immediateAppointments
        this.nextAppointments = data.payload.nextAppointments
        console.log( this.nextAppointments)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setAppointmentCancelReasons(row){
    this.appointmentsEvents.setAppointmentCancelReasons$.emit(row)
  }

  openModalReagendamiento(item) {
    this.appointmentsEvents.setAppointmentReagendamiento$.emit(item)
    this.appointmentsEvents.getProfessionalBlocks$.emit(item)
  }


}

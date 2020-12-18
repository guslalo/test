import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { environment } from 'src/environments/environment'
import * as moment from 'moment';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class IndexComponent implements OnInit {
  public consultas: any;
  public consultasListaDeEspera: any;
  public currentUser: any = {};
  public photoUrlBase = environment.photoUrlBase;

  ColumnMode = ColumnMode;
  moment: any = moment;

  constructor(
    public currentUserService: CurrentUserService, 
    public appointmentsService: AppointmentsService,
    private appointmentsEvents: AppointmentEventsService,
    ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAppointments();
    this.getAppointmentsWaitingRooms();

    this.appointmentsEvents.listAppointments$.subscribe(() => {
      this.getAppointments()
    })
  }

  setAppointment(item){
    console.log('setAppointment Coordinator', item)
    this.appointmentsEvents.setAppointmentReagendamiento$.emit(item)
  }

  getAppointments() {
    this.appointmentsService.getAllAppointments(1).subscribe(
      (data) => {
        console.log('getAllAppointments', data.payload);

        let filteredAppointments = data.payload
          .sort((a, b) => {
            var a: any = new Date(a.dateDetails?.date);
            var b: any = new Date(a.dateDetails?.date);
            return a - b;
          })
          .filter((finished) => finished.administrativeDetails.status !== 'finished');
        
          this.consultas = filteredAppointments;

        /*var dates = data.payload.map(function(x) { return new Date(x.dateDetails.date); });
        var latest = new Date(Math.max.apply(null,dates));
        var earliest = new Date(Math.min.apply(null,dates));*/
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setAppointmentCancelReasons(row){
    this.appointmentsEvents.setAppointmentCancelReasons$.emit(row)
  }

  getAppointmentsWaitingRooms() {
    this.appointmentsService.getAllAppointmentsWaitinRooms().subscribe(
      (data) => {
        console.log(data.payload);
        let filteredAppointments = data.payload
          .sort((a, b) => {
            var a: any = new Date(a.dateDetails?.date);
            var b: any = new Date(a.dateDetails?.date);
            return a - b;
          })
          .filter((finished) => finished.administrativeDetails.status !== 'finished');
        this.consultasListaDeEspera = filteredAppointments;
        /*var dates = data.payload.map(function(x) { return new Date(x.dateDetails.date); });
        var latest = new Date(Math.max.apply(null,dates));
        var earliest = new Date(Math.min.apply(null,dates));*/
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

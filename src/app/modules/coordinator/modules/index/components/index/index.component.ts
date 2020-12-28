import { Component, HostListener, OnInit } from '@angular/core';
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
  @HostListener('click', ['$event.target']) 
  onClick(e) {
    this.appointmentsEvents.enableCheckDatesEnableButtons(this.consultas)
  }

  public consultas: any;
  public consultasListaDeEspera: any;
  public currentUser: any = {};
  public photoUrlBase = environment.photoUrlBase;
  public nextAppointments = []
  public openAppointments = []
  public immediateAppointments = []

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
    this.getAppointmentsForTypes();
    this.appointmentsEvents.listAppointments$.subscribe(() => {
      this.getAppointments()
    })
  }

  setAppointment(item){
    console.log('setAppointment Coordinator', item)
    this.appointmentsEvents.setAppointmentReagendamiento$.emit(item)
  }

  getAppointments() {
    this.appointmentsService.getAllAppointmentsForCoordinator(1).subscribe(
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
          this.appointmentsEvents.enableCheckDatesEnableButtons(this.consultas)

        /*var dates = data.payload.map(function(x) { return new Date(x.dateDetails.date); });
        var latest = new Date(Math.max.apply(null,dates));
        var earliest = new Date(Math.min.apply(null,dates));*/
      },
      (error) => {
        console.log(error);
      }
    );
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

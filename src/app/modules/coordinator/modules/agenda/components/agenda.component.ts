import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './events-utils';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppointmentsService } from './../../../../../services/appointments.service';
import * as moment from 'moment';

const states = ['test', 'test3', 'test4'];
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  public model: any;
  public timeline: any;
  public fecha: any;

  model2: NgbDateStruct;

  constructor(private appointmentsService: AppointmentsService) {}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    // dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-08-23', days: 3 },
      { title: 'event 5', date: '2020-08-23', test: 'sadsdsda' },
      { title: 'event 6', date: '2020-08-23', test: '685684' },
      { title: 'event 2', date: '2020-08-26', test: 'saddsaa' },
    ],
  };
  ngOnInit(): void {
    this.fetchCalendar();
    this.getAppointmentsTimeline();
  }

  fetchCalendar() {
    this.appointmentsService.getAllAppointments(1).subscribe(
      (data) => {
        // console.log(data.payload);

        for (const item of data.payload) {
          console.log(item);
          events.push({
            type: 'appointment',
            title: `Consulta, Paciente ${item.patientDetails.userDetails[0].personalData.name} ${
              item.patientDetails.userDetails[0].personalData.secondLasName ||
              item.patientDetails.userDetails[0].personalData.lastName
            }`,
            start: `${moment.utc(item.dateDetails.date).format('YYYY-MM-DD')}T${item.dateDetails.start}`,
            end: `${moment.utc(item.dateDetails.date).format('YYYY-MM-DD')}T${item.dateDetails.end}`,
            color: '#6fc1f1',
          });

          this.calendarOptions.events = events;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    let events = [];
  }

  getAppointmentsTimeline() {
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      (data) => {
        this.timeline = data.payload;
        console.log(this.timeline);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

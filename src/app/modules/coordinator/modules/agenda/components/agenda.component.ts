import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../../../services/appointments.service';
import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es';
import ptLocale from '@fullcalendar/core/locales/pt';
import { TranslocoService } from '@ngneat/transloco';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';

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

  constructor(
    private appointmentsService: AppointmentsService,
    private translationService: TranslocoService,
    private appointmentsEvents: AppointmentEventsService
  ) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events: [{ title: 'event 1', date: '2020-08-23', days: 3 }],
    locales: [esLocale, ptLocale],
    locale: this.translationService.getActiveLang(),
  };
  ngOnInit(): void {
    this.fetchCalendar();
    this.getAppointmentsTimeline();
  }

  ngAfterViewInit() {
    let _user = JSON.parse(localStorage.getItem('currentUser'))
    this.appointmentsEvents.buildForm$.emit(_user.role)
    this.appointmentsEvents.getProfessionals$.emit()
    this.appointmentsEvents.getMedicalSpecialties$.emit()
  }

  fetchCalendar() {
    this.appointmentsService.getAllAppointments(1).subscribe(
      (data) => {
        // console.log(data.payload);

        for (const item of data.payload) {
          // console.log(item);
          events.push({
            type: 'appointment',
            title: `Consulta, Paciente ${item.patientDetails.userDetails[0].personalData.name} ${item.patientDetails.userDetails[0].personalData.secondLasName ||
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

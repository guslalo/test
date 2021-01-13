import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppointmentsService } from './../../../../services/appointments.service';
import esLocale from '@fullcalendar/core/locales/es';
import ptLocale from '@fullcalendar/core/locales/pt';
import { TranslocoService } from '@ngneat/transloco';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';

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

  constructor(
    private appointmentsService: AppointmentsService,
    private translocoService: TranslocoService,
    private appointmentsEvents: AppointmentEventsService
  ) { }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    // dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [{ title: 'event 1', date: '2020-08-23', days: 3 }],
    locales: [esLocale, ptLocale],
    locale: this.translocoService.getActiveLang()
  };
  ngOnInit(): void {
    this.getAppointmentsTimeline();
    this.getFecha();
    console.log(this.translocoService.getActiveLang())
  }

  ngAfterViewInit() {
    let _user = JSON.parse(localStorage.getItem('currentUser'))
    let _userId = _user.id
    this.appointmentsEvents.getSpecialtiesForProfessional$.emit(_userId)
    this.appointmentsEvents.buildForm$.emit(_user.role)
  }

  getFecha() {
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });

    this.fecha = {
      year: fecha.getFullYear(),
      month: month,
    };
    //console.log(currentMonth);
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
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );
}

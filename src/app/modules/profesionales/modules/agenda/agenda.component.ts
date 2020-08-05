import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const states = ['test', 'test3', 'test4'];
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  public model: any;

  model2: NgbDateStruct;

  constructor() {}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-07-21' },
      { title: 'event 2', date: '2020-07-20' },
    ],
  };
  ngOnInit(): void {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );
}

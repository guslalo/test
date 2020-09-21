import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../../../../services/appointments.service';

const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public model: any;
  public consultas: any;
  model2: NgbDateStruct;
  public timeline: any;
  public fecha: any;

  constructor(private appointmentsService: AppointmentsService) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );
  ngOnInit(): void {
    this.getAppointments();
    this.getFecha();
    this.getAppointmentsTimeline();
  }

  getFecha() {
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });

    this.fecha = {
      year: fecha.getFullYear(),
      month: month,
    };
  }

  getAppointments() {
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        console.log(data);
        this.consultas = data.payload;
        console.log(this.consultas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointmentsTimeline() {
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      (data) => {
        this.timeline = data.payload.filter((finished) => finished.status === 'finished');
        console.log(this.timeline);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

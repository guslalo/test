import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../../../../services/appointments.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-mis-consultas',
  templateUrl: './mis-consultas.component.html',
  styleUrls: ['./mis-consultas.component.scss'],
})
export class MisConsultasComponent implements OnInit {
  public consultas: any;
  public consultasActivas: any;
  public model: any;
  public timeline: any;
  moment: any = moment;
  page: number = 1;
  page2: number = 1;
  totalPages: number;
  totalPages2: number;
  public fecha: any;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {    
    this.page = 1;
    this.page2 = 1;
    this.appointmentsService.getTotalPages().subscribe((data) => {
      console.log(data);
      //this.totalPages = data.payload.numberOfPages;
    });

    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        console.log(data.payload);
        this.consultas = data.payload.filter(
          (lista) =>
            lista.administrativeDetails.status === 'active' ||
            lista.administrativeDetails.status === 'running' ||
            lista.administrativeDetails.status === 'pending' ||
            lista.administrativeDetails.status === 'appointed' ||
            lista.administrativeDetails.status === 'finished'
        );
        //this.consultas = data.payload;
        console.log(this.consultas.length)
        this.totalPages = this.consultas.length  ;
        console.log(this.totalPages)
      },
      (error) => {
        console.log(error);
      }
    );

    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        console.log(data.payload);
        this.consultasActivas = data.payload.filter(
          (lista) =>
            lista.administrativeDetails.status === 'created' || lista.administrativeDetails.status === 'waitingInList'
        );
        this.consultasActivas = data.payload;
        this.totalPages2 = this.consultasActivas.length;
      },
      (error) => {
        console.log(error);
      }
    );
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

  getAppointmentsTimeline() {
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      (data) => {
        this.timeline = data.payload;

        //console.log(this.timeline)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

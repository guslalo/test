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
  public model: any;
  moment: any = moment;
  page: number;
  totalPages: number;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.page = 1;
    this.appointmentsService.getTotalPages().subscribe((data) => {
      console.log(data);
      this.totalPages = data.payload.numberOfPages;
    });

    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        console.log(data);
        this.consultas = data.payload.sort(function compare(a, b) {
          var dateA: any = new Date(a.dateDetails.date);
          var dateB: any = new Date(b.dateDetails.date);
          return dateB - dateA;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  pageChange(page) {
    console.log(page);
    this.page = page;

    this.appointmentsService.getAppointments(page).subscribe(
      (data) => {
        console.log(data);
        this.consultas = data.payload.sort(function compare(a, b) {
          var dateA: any = new Date(a.dateDetails.date);
          var dateB: any = new Date(b.dateDetails.date);
          return dateB - dateA;
        });
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(this.page);
  }
}

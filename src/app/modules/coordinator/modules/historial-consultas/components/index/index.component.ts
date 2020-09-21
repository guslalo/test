import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import * as moment from 'moment';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { ColumnMode } from '@swimlane/ngx-datatable';

const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public appointments: any;
  model2: NgbDateStruct;
  public timeline: any;
  public fecha: any;
  public photoUrlBase = 'https://itms-dev.s3-sa-east-1.amazonaws.com/';

  moment: any = moment;
  ColumnMode = ColumnMode;

  // FILTERS
  tempAppointments: any[] = [];
  searchTerm: string = '';
  appointmentStatusSelected: any = null;
  appointmentDateSelected: NgbDateStruct;

  dateAdapter = new CustomDateAdapter();

  constructor(private appointmentsService: AppointmentsService) {}

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
    this.appointmentsService.getAllAppointments(1).subscribe(
      (data) => {
        this.tempAppointments = [...data.payload];
        this.appointments = data.payload;
        console.log(this.appointments);
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

  applyFiltersAppointments() {
    const searchTerm = this.searchTerm.toLowerCase();

    const temp = this.tempAppointments
      // SEARCH FILTER
      .filter((item) => {
        return (
          (item.patientDetails.userDetails[0].identificationData.cpf?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.userDetails[0].identificationData.cns?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.userDetails[0].identificationData.rgRegistry?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.userDetails[0].identificationData.passport?.toLowerCase().indexOf(searchTerm)) !== -1 ||
          item.patientDetails.userDetails[0]?.personalData.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          item.professionalDetails.userDetails[0]?.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          moment(item.dateDetails.date).format('DD/MM/YYYY').toLowerCase().indexOf(searchTerm) !== -1 ||
          item.dateDetails.start.toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      })
      // STATUS APPOINTMENT FILTER
      .filter((item) => {
        if (this.appointmentStatusSelected) {
          if (item.administrativeDetails.status === this.appointmentStatusSelected) {
            return item;
          }
        } else {
          return item;
        }
      })
      // DATE APPOINTMENT FILTER
      .filter((item) => {
        if (this.appointmentDateSelected) {
          const date = this.dateAdapter.toModel(this.appointmentDateSelected);
          console.log(date, item.dateDetails.date);
          if (moment(item.dateDetails.date).format('YYYY/MM/DD') === date) {
            return item;
          }
        } else {
          return item;
        }
      });

    this.appointments = temp;
    // console.log(temp);
  }
}

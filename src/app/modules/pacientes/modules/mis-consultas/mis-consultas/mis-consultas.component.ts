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
  totalPages: number;
  public fecha:any;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.page = 1;
    this.appointmentsService.getTotalPages().subscribe((data) => {
      console.log(data);
      this.totalPages = data.payload.numberOfPages;
    });

    
  
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        console.log(data.payload);
        this.consultas = data.payload.filter(lista => lista.administrativeDetails.status !=='waitingInList')
        //this.consultas = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );

    this.appointmentsService.getAppointments(1,'waitingInList').subscribe(
      (data) => {
        console.log(data.payload);
        this.consultasActivas = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
    this. getFecha();
    this.getAppointmentsTimeline();
  }

  getFecha(){
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });

    this.fecha = {
      year: fecha.getFullYear(),
      month: month
    }
  }
    
  getAppointmentsTimeline(){
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      data => { 
        this.timeline = data.payload;
     
        console.log(this.timeline)
      },
      error => {
        console.log(error)
      }
    )
  }

}

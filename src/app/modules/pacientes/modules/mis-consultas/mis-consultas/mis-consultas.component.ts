import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../../../../services/appointments.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mis-consultas',
  templateUrl: './mis-consultas.component.html',
  styleUrls: ['./mis-consultas.component.scss'],
})
export class MisConsultasComponent implements OnInit {
  public consultas: any;
   public model: any;

  model2: NgbDateStruct;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.appointmentsService.getAppointments(1, 'appointed').subscribe(
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
}

import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../../../../../services/appointments.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public consultas: any;
  public model: any;


  constructor(private appointmentsService:AppointmentsService) { }

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

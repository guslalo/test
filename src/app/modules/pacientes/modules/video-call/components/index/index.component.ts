import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../services/appointments.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private appointmentsService:AppointmentsService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
     
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

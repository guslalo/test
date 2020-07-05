import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';

@Component({
  selector: 'app-mis-consultas',
  templateUrl: './mis-consultas.component.html',
  styleUrls: ['./mis-consultas.component.scss']
})
export class MisConsultasComponent implements OnInit {
  public consultas:any;

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {

    this.appointmentsService.getAppointments().subscribe(
      data => {
        this.consultas = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}


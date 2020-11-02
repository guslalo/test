import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent implements OnInit {
  public reserva: any;
  appointmentId: any;
  public appointment: any;

  constructor(private route: ActivatedRoute, private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.initCall();

    /*this.appointmentId = localStorage.getItem('appointmentIdAgenda');
    console.log(this.appointmentId);

    console.log(JSON.parse(localStorage.getItem('reserva')));
    this.reserva = JSON.parse(localStorage.getItem('reserva'));*/
  }
  initCall(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.appointmentId = params.appointmentId;
      this.getAppointmentDetails(params.appointmentId);
    });
  }

  getAppointmentDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        console.log(data)
        this.appointment = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

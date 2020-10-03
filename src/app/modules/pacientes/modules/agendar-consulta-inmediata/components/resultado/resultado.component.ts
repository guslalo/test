import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent implements OnInit {
  public appointment: any;
  public appointmentId:any;

  constructor(private route: ActivatedRoute, private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.initCall();
    //console.log(JSON.parse(localStorage.getItem('reserva')));
    //this.reserva =  JSON.parse(localStorage.getItem('reserva'));
  }

  initCall(): void {
    this.route.params.subscribe((params) => {
      this.appointmentId = params.appointmentId;
      const id = params.id;
      console.log(params.appointmentId);
      this.getAppointmentDetails(params.appointmentId);
    });
  }

  getAppointmentDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.appointment = data.payload;

        console.log(data);
        console.log(this.appointment.administrativeDetails.waitingRoomId);
        this.getWaitingRoom(this.appointment.administrativeDetails.waitingRoomId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getWaitingRoom(id) {
    this.appointmentsService.getWaitingAppointmentForRoomsId(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

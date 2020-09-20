import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  public appointment:any;


  constructor(private route: ActivatedRoute, private appointmentsService:AppointmentsService) { }

  ngOnInit(): void {
    this.initCall();
    //console.log(JSON.parse(localStorage.getItem('reserva')));
    //this.reserva =  JSON.parse(localStorage.getItem('reserva'));
  }

  
  initCall(): void {
    this.route.params.subscribe(params => {
     const id = params.id;
     console.log(params.appointmentId);
     this.getAppointmentDetails(params.appointmentId);
   });
  }

  getAppointmentDetails(id){
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      data => {
        this.appointment = data.payload;
        console.log(data);
        this.getWaitingRoom();
      },
      error => {
          console.log(error)
      }
    )
  }

  getWaitingRoom(){
    this.appointmentsService.getWaitingRooms().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }



}

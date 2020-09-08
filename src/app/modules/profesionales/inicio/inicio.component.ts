import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './../../../services/current-user.service';
import { NgbRatingConfig, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../services/appointments.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})

export class InicioPComponent implements OnInit {
  // public currentUser:any;
  public consultas: any;
  public currentUser: any = {};
  currentRate = 4;

  constructor(
    private appointmentsService:AppointmentsService,
    public currentUserService: CurrentUserService, 
    config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;

    /* config2.justify = 'center';
      config2.type = 'pills';*/
  }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
    this.getAppointments();
  }

  getAppointments(){
    this.appointmentsService.getAppointments(1).subscribe(
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

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
  public fecha: any;
  public nextAppointed: any;
  public consultasFinalizadas: any;

  constructor(
    private appointmentsService: AppointmentsService,
    public currentUserService: CurrentUserService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;

    /* config2.justify = 'center';
      config2.type = 'pills';*/
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        let arrayForDate = data.payload.map((value) => value.dateDetails.date);
        var min = arrayForDate[0];
        arrayForDate.forEach((numero) => {
          if (numero < min) {
            min = numero;
          }
        });
        this.nextAppointed = data.payload.filter((now) => now.dateDetails.date === min);
        let finalizadas = data.payload.filter((finished) => finished.administrativeDetails.status === 'finished');
        this.consultasFinalizadas = finalizadas.length;

        this.consultas = data.payload;
        console.log(this.consultas);
        /*var dates = data.payload.map(function(x) { return new Date(x.dateDetails.date); });
        var latest = new Date(Math.max.apply(null,dates));
        var earliest = new Date(Math.min.apply(null,dates));*/
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public consultas: any;
  public currentUser: any = {};
  public nextAppointed: any;
  public consultasFinalizadas: any;
  public photoUrlBase = 'https://itms-dev.s3-sa-east-1.amazonaws.com/';

  constructor(public currentUserService: CurrentUserService, public appointmentsService: AppointmentsService) {}

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

import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../../../../services/appointments.service';

const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-historial-consultas',
  templateUrl: './historial-consultas.component.html',
  styleUrls: ['./historial-consultas.component.scss'],
})
export class HistorialConsultasComponent implements OnInit {
  public model: any;
  public consultas: any;
  model2: NgbDateStruct;

  constructor(private appointmentsService:AppointmentsService) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    )

  ngOnInit(): void {
    this.getAppointments();
  }

  
  getAppointments(){
    this.appointmentsService.getAppointments(1, 'finished').subscribe(
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

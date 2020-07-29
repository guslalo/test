import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.scss']
})
export class FichaPacienteComponent implements OnInit {
  public model: any;
  model2: NgbDateStruct;
  constructor() { }
  tomorrow = new Date (2020, 9, 20, 14,34);
  ngOnInit(): void {
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

}

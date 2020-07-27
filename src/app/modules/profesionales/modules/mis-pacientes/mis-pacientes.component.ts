import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, 
  NgbDateParserFormatter,
  NgbDatepickerConfig,
   NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
   const states = ['test', 'test3', 'test4'];
  
@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss']
})
export class MisPacientesComponent implements OnInit {
  model2: NgbDateStruct;
  model: any;


  constructor() { }
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )


  ngOnInit(): void {
    
  }
  
}

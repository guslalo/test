import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-historial-consultas',
  templateUrl: './historial-consultas.component.html',
  styleUrls: ['./historial-consultas.component.scss'],
})
export class HistorialConsultasComponent implements OnInit {
  public model: any;

  model2: NgbDateStruct;

  constructor() {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  ngOnInit(): void {}
}

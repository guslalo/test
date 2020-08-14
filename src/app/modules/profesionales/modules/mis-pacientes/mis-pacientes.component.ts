import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbPagination,
  NgbPaginationConfig,
  NgbTimepicker,
} from '@ng-bootstrap/ng-bootstrap';
// import { NgbdPaginationBasic } from './pagination-basic';
const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {
  model2: NgbDateStruct;
  model: any;
  // ublic page = 4;

  name = 'Angular';
  page = 1;
  pageSize = 7;
  items = [];
  edited = 'false';

  constructor(config: NgbPaginationConfig) {
    // customize default values of paginations used by this component tree
    /*config.size = 'sm';
config.boundaryLinks = true;*/

    for (let i = 1; i <= 100; i++) {
      this.items.push({ Name: 'Shop ' + i });
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    )

  ngOnInit(): void {}
}

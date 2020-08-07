import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbPagination,
  NgbPaginationConfig,
  NgbTimepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
  public model: any;
  model2: NgbDateStruct;
  //model: any;
  //ublic page = 4;

  name = 'Angular';
  page = 1;
  pageSize = 7;
  items = [];
  edited = 'false';


  tomorrow = new Date(2020, 9, 20, 14, 34);
  constructor() { }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    )
  );

  ngOnInit(): void {
  }



}

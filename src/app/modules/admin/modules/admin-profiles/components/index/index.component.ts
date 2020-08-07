import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
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
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}


const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  public profile:any;

  public model: any;
  model2: NgbDateStruct;
  //model: any;
  //ublic page = 4;
 

  name = 'Angular';
  page = 1;
  pageSize = 7;
  items = [];
  edited = 'false';

  public states = ['test', 'test3', 'test4'];
  tomorrow = new Date(2020, 9, 20, 14, 34);
  constructor(public adminService: AdminService) { 

    
  }

 

  ngOnInit(): void {
    this.adminService.getProfiles().subscribe(
      data => {
        console.log(data)
        this.profile = data;
      },
      error => {
        console.log(error)
      }
    )
  }
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 2 ? [] :  this.states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    )
  );


}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
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

const states = ['1', '2', '3'];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  tab = 'admins';

  model2: NgbDateStruct;
  model: any;

  name = 'Angular';
  page = 1;
  pageSize = 7;
  users = [];
  edited = 'false';

  constructor(config: NgbPaginationConfig, public adminService: AdminService) {}

  ngOnInit(): void {
    //this.user = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.UserLogin);
    this.getUsers();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  getUsers() {
    this.adminService.getUsers('admins').subscribe(
      (data) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeTab(userType: string) {
    this.adminService.getUsers(userType).subscribe(
      (data) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

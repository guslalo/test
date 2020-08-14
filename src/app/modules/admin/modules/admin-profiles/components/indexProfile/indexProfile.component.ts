import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './indexProfile.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexProfileComponent implements OnInit {
  page = 1;
  pageSize = 7;
  profiles: any = [];
  isEdit: boolean = false;

  public states = ['test', 'test3', 'test4'];
  tomorrow = new Date(2020, 9, 20, 14, 34);
  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getProfiles().subscribe(
      (data) => {
        // console.log(data);
        this.profiles = data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProfile(profileId): void {
    this.adminService.getProfileById(profileId).subscribe(
      (data) => {
        // console.log(data);
        this.profiles = data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : this.states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );
}

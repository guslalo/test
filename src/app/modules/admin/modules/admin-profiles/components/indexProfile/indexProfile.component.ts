import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './indexProfile.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexProfileComponent implements OnInit {
  searchTerm: string = '';
  roleSelected: string = null;

  page = 1;
  pageSize = 7;
  temp: any[] = [];
  profiles: any = [];
  isEdit: boolean = false;

  public states = ['test', 'test3', 'test4'];
  tomorrow = new Date(2020, 9, 20, 14, 34);
  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getProfiles().subscribe(
      (data) => {
        // console.log(data);
        this.temp = [...data.reverse()];
        this.profiles = data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilters() {
    const role = this.roleSelected;
    const searchTerm = this.searchTerm.toLowerCase();
    console.log(role, searchTerm);

    const temp = this.temp
      // ROLE FILTER
      .filter((profile) => {
        if (role) {
          if (profile.role === role) {
            return profile;
          }
        } else {
          return profile;
        }
      })
      // SEARCH FILTER
      .filter((profile) => {
        return profile.profileName.toLowerCase().indexOf(searchTerm) !== -1 || !searchTerm;
      });

    this.profiles = temp;
  }
}

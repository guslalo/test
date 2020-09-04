import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public currentUser: any = {};

  constructor(public currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
  }
}

import { Component, OnInit } from '@angular/core';
//environment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class LeftColumnComponent implements OnInit {
  public setup: any;
  public version: any;
  constructor() { }

  ngOnInit(): void {
    this.setup = environment.setup;
    this.version = environment.version
  }
}

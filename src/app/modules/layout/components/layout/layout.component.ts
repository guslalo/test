import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }
  public user:any;

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user');
  }

}

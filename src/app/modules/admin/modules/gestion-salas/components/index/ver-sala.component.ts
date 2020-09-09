import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'selector-name',
  templateUrl: 'ver-sala.component.html',
})
export class VerSalaComponent implements OnInit {
  appointments: any[] = [];
  searchTerm: string = '';
  profileSelected: string = null;
  pageSize: number = 10;
  ColumnMode = ColumnMode;

  constructor() {
    this.appointments = [
      {
        name: 'name lastname',
        start: '12:00',
        waitingTime: '20m',
        status: 'appointed',
      },
    ];
  }

  ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  waitingRooms: any[] = [];
  searchTerm: string = '';
  profileSelected: string = null;
  pageSize: number = 10;
  ColumnMode = ColumnMode;

  // FORM
  acceptPayments: boolean = false;
  role: string = 'professionals';

  constructor() {
    this.waitingRooms = [
      {
        id: 12345,
        name: 'Sala de Espera 1',
        description: 'desc 1',
        url: 'www.crisaty.com',
        payments: true,
        isActive: true,
      },
    ];
  }

  ngOnInit(): void {}
}

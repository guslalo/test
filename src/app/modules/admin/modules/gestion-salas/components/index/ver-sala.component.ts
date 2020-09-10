import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';
import * as moment from 'moment';

@Component({
  selector: 'selector-name',
  templateUrl: 'ver-sala.component.html',
})
export class VerSalaComponent implements OnInit {
  roomId: string;

  appointments: any[] = [];
  searchTerm: string = '';
  profileSelected: string = null;
  pageSize: number = 10;
  ColumnMode = ColumnMode;

  professionalsTotal: number;
  roomName: string;
  createdAt: any;
  createdBy: any;

  constructor(private router: Router, private roomsService: RoomsService) {}

  ngOnInit() {
    this.roomId = this.router.url.split('/').pop();
    // console.log(roomId);
    this.roomsService.getWaitingRooms(this.roomId).subscribe((data) => {
      console.log(data.payload);
      this.appointments = data.payload.appointmentDetails;
      this.roomName = data.payload.roomDetails.name;
      this.professionalsTotal = data.payload.personnelDetails.professionals.length;

      this.createdAt = moment(data.payload.administrativeDetails.createdAt).format('DD-MM-YYYY');
      if (data.payload.administrativeDetails.createdBy.length)
        this.createdBy =
          data.payload.administrativeDetails.createdBy[0]?.personalData.name +
          ' ' +
          data.payload.administrativeDetails.createdBy[0]?.personalData.lastName;
      else this.createdBy = 'S/R';
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public waitingRooms: any[] = [];

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getWaitingRooms().subscribe(
      (data) => {
        console.log(data.payload);
        this.waitingRooms = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

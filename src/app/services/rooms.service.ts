import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private waitingRooms = 'v1/waiting-rooms';
  professionals = [];
  coordinators = [];

  constructor(private http: HttpClient) {}

  getWaitingRooms(roomId?): Observable<any> {
    if (!roomId) {
      return this.http.get<any>(environment.baseUrl + this.waitingRooms);
    } else {
      return this.http.get<any>(environment.baseUrl + this.waitingRooms + '/?waitingRoomId=' + roomId);
    }
  }

  createWaitingRoom(roomObject): Observable<any> {
    let personnelDetails: any = {};
    if (roomObject.professionals.length) personnelDetails.professionals = roomObject.professionals;
    if (roomObject.coordinators.length) personnelDetails.coordinators = roomObject.coordinators;

    return this.http.post<any>(environment.baseUrl + this.waitingRooms, {
      administrativeDetails: {
        requirePayment: roomObject.requirePayment,
        appointmentPrice: roomObject.appointmentPrice,
      },
      roomDetails: {
        name: roomObject.name,
        description: roomObject.description,
      },
      personnelDetails,
    });
  }

  updateWaitingRoom(roomObject, roomId: string): Observable<any> {
    let personnelDetails: any = {};
    if (roomObject.professionals.length) personnelDetails.professionals = roomObject.professionals;
    if (roomObject.coordinators.length) personnelDetails.coordinators = roomObject.coordinators;

    return this.http.put<any>(environment.baseUrl + this.waitingRooms + '/?waitingRoomId=' + roomId, {
      administrativeDetails: {
        requirePayment: roomObject.requirePayment,
        appointmentPrice: roomObject.appointmentPrice,
      },
      roomDetails: {
        name: roomObject.name,
        description: roomObject.description,
      },
      personnelDetails,
    });
  }

  getProfessionals(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.waitingRooms + '/professionals');
  }

  getCoordinators(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.waitingRooms + '/coordinators');
  }
}

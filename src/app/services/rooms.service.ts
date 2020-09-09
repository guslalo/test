import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private waitingRooms = 'v1/waiting-rooms';

  constructor(private http: HttpClient) {}

  //specialties
  createWaitingRoom(roomObject): Observable<any> {
    console.log(roomObject);

    return this.http.post<any>(environment.baseUrl + this.waitingRooms, {
      administrativeDetails: {
        requirePayment: roomObject.acceptPayment,
        appointmentPrice: roomObject.appointmentPrice,
      },
      roomDetails: {
        name: roomObject.name,
        description: roomObject.description,
      },
      personnelDetails: {
        professionals: roomObject.professionals,
        coordinators: roomObject.coordinators,
      },
    });
  }
}

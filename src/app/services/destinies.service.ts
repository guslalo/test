import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DestiniesService {
  private destinies = 'v1/destinies';
  private destiny = 'v1/appointments/destiny/';

  constructor(private http: HttpClient) {}

  //specialties
  getDestinies(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.destinies);
  }

  //delete specialties
  deleteSymptoms(appointmentId, destiny): Observable<any> {
    console.log(appointmentId, destiny);
    const params = new HttpParams().set('appointmentId', appointmentId).set('destinyId', destiny);

    return this.http.delete<any>(environment.baseUrl + this.destiny, { params: params });
  }
}

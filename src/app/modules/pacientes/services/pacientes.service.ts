import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private appointments = 'v1/appointments';
  private doctors = 'v1/doctors';
  private session = '/session';

  constructor(private http: HttpClient) {}

  //getAppointments
  getAppointments2(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/' + id);
  }

  //get getAppointmentsSession
  getAppointmentsSession(appointmentId): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.session, { appointmentId });
  }
}

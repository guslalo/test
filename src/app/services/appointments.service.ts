import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService {
  private appointments = 'v1/appointments';
  private doctors = 'v1/doctors';
  private session = '/session';
  
  constructor(private http: HttpClient) {  }

  //getAppointments
  getAppointments( ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('token'))//,
        //'Content-Type': 'application/json'
      })
    };
   
    return this.http.get<any>(  environment.baseUrl + this.appointments, httpOptions );
  }

  //getDoctors
  getDoctors( ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('token'))//,
        //'Content-Type': 'application/json'
      })
    };
   
    return this.http.get<any>(  environment.baseUrl + this.doctors, httpOptions );
  }

  //get getAppointmentsSession
  getAppointmentsSession( appointmentId ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('token'))//,
        //'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(  environment.baseUrl + this.appointments + this.session, { appointmentId }, httpOptions);
  }

}

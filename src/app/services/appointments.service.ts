import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService {
 
  private appointments = 'appointments/';
  private session = 'session/';
  
  constructor(private http: HttpClient) {  }

  //  getAppointments
  getAppointments( idUser?:any ): Observable<any> {
    return this.http.get<any>(  environment.baseUrl + this.appointments);
  }

   // get getAppointmentsSession
   getAppointmentsSession( ): Observable<any> {
    return this.http.post<any>(  environment.baseUrl + this.appointments + this.session, {  } );
  }

}

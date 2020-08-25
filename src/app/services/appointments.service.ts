import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private appointments = 'v1/appointments';
  private doctors = 'v1/doctors';
  private session = '/session';
  private reserve = '/reserve'
  private consolidate = '/consolidate'

  constructor(private http: HttpClient) {}

  // getAppointments
  getAppointments(number, status?): Observable<any> {
    if(status) {
      const params = new HttpParams()
      .set('page', number)
      .set('status', status);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params } );
    } else {
      let params = new HttpParams();
      params = params.append('page', number);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params } );
    }

  }

  // getAppointments
  getAppointments2(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/' + id);
  }

  // api.bdot.app/api/v1/appointemnts/5f049b9948ab2c55c1db33fa

  // getDoctors
  getDoctors(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('token'))//,
        // 'Content-Type': 'application/json'
      }),
    };

    return this.http.get<any>(environment.baseUrl + this.doctors, httpOptions);
  }

  // get getAppointmentsSession
  getAppointmentsSession(appointmentId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('token'))//,
        // 'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(environment.baseUrl + this.appointments + this.session, { appointmentId });
  }

  //reservar cita
  postReserve(reserve): Observable<any> {
   return this.http.post<any>(environment.baseUrl + this.appointments + this.reserve, reserve );
  }

  //consolidate appointments
  postConsolidate(consolidate): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.consolidate, consolidate );
  }


}

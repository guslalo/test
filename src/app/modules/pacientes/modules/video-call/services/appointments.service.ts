import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private appointments = 'v1/appointments';
  private doctors = 'v1/doctors';
  private session = '/session';
  private reserve = '/reserve'


  constructor(private http: HttpClient) {}

  // getAppointments
  getAppointments(number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', number);

    return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params } );
  }

  // getAppointments
  getAppointments2(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/' + id);
  }

  // api.bdot.app/api/v1/appointemnts/5f049b9948ab2c55c1db33fa

 
  // get getAppointmentsSession
  getAppointmentsSession(id): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.session, { id:id });
  }

 


}

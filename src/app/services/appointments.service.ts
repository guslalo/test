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
  private reschedule = '/reschedule' 

  constructor(private http: HttpClient) {}

  paramsId(id){
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return params;
  }

  //getAppointments
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

  // getAppointmentsDetails
  getAppointmentsDetails(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/details/', { params: params });
  }

  // getAppointmentsDetails
  getAppointmentsTimeline(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/timeline');
  }

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

  //get Appointment professional data
  getAppointmentsProfessionalData(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/professional/', { params: params });
  }


  //events
  postRunAppointment(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/reschedule', { params: params });
  }


  //postRunAppointment(id): Observable<any> {
    postEventAppointment(id, event): Observable<any> {
      let params = new HttpParams();
      params = params.append('appointmentId', id);
      return this.http.post<any>(environment.baseUrl + this.appointments + '/' + event,'', { params: params });
    }
  
}

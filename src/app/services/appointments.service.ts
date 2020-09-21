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
  private reserve = '/reserve';
  private consolidate = '/consolidate';
  private reschedule = '/reschedule';
  private pagoStatus = 'v1/appointments/payment/status/';
  private inmediateAppointment = 'v1/administrative/immediate/state';
  private inmediate = 'v1/appointments/immediate/';
  private immediateConsolidate = 'v1/appointments/immediate/consolidate';
  private pagoStatusInmediate = 'v1/appointments/immediate/status';
  private waitingForRooms = 'v1/waiting-rooms';
  private waitingAppointmentsForRooms = this.inmediate;
  private appointmentInmediate =  'v1/appointments/immediate/attend';
  

  constructor(private http: HttpClient) {}

  paramsId(id) {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return params;
  }

  //getAppointments
  getAppointments(number, status?): Observable<any> {
    if (status) {
      const params = new HttpParams().set('page', number).set('status', status);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params });
    } else {
      let params = new HttpParams();
      params = params.append('page', number);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params });
    }
  }

  getAllAppointments(number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', number);
    return this.http.get<any>(environment.baseUrl + this.appointments + `/all/`, { params: params });
  }

  getTotalPages(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + `/pages`);
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

  // getAppointmentsDetails
  getAppointmentsTimelineMilestone(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/milestone-timeline', { params: params });
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
  getAppointmentsSession(id): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.session, { id: id });
  }

  //reservar cita
  postReserve(reserve): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.reserve, reserve);
  }

  //consolidate appointments
  postConsolidate(consolidate): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.consolidate, consolidate);
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

  //events
  getPaymentStatus(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.pagoStatus, { params: params });
  }

  //postRunAppointment(id): Observable<any> {
  postEventAppointment(id, event): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.post<any>(environment.baseUrl + this.appointments + '/' + event, '', { params: params });
  }

  //postRunAppointment(id): Observable<any> {
  putAppointment(id, appointmentDetails): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.put<any>(environment.baseUrl + this.appointments, appointmentDetails, { params: params });
  }

  //Appointment Inmediate
  getAppointmentInmediateState(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.inmediateAppointment);
  }

  AppointmentInmediate(): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.inmediate, {});
  }

  postImmediateConsolidate(object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.immediateConsolidate, object);
  }

  getPaymentStatusAppointmentInmediate(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.pagoStatusInmediate, { params: params });
  }

  getWaitingRooms(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.waitingForRooms);
  }

  getWaitingAppointmentForRoomsId(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('waitingRoomId', id);
    return this.http.get<any>(environment.baseUrl + this.waitingAppointmentsForRooms, { params: params });
  }

  attendAppointmentInmediate(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.post<any>(environment.baseUrl + this.appointmentInmediate, '', { params: params });
  }





}

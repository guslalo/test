import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private account = 'v1/account';
  private coordinators = 'v1/coordinator';
  private professionals = 'v1/professionals';
  private patients = 'v1/patient';
  private opts = [];

  constructor(private http: HttpClient) { }

  // getProfessionals
  getPatientsForProfesional(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals + '/patients');
  }

  getPrePatientsForProfesional(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals + '/prePatients');
  }

  getAllPrePatients(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.coordinators + '/prePatients');
  }

  getPrePatient(prePatientId: string): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.account + '/finish-registration/' + prePatientId);
  }

  createPrePatient(patientObject): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.patients + '/prePatient', patientObject);
  }

  getPatients(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.patients);
  }

  getAllPatients(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.coordinators + '/patients');
  }

  sendInvitationEmail(patientsIds): Observable<any> {
    return this.http.patch<any>(environment.baseUrl + this.professionals + '/sendInvitation', {
      patients: patientsIds,
    });
  }

  search(query) {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(environment.baseUrl + this.patients + '/search?filter=' + query)
        .pipe(tap(data => this.opts = data))
  }
}

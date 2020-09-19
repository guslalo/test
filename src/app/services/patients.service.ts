import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private account = 'v1/account';
  private professionals = 'v1/professionals';
  private patients = 'v1/patient';

  constructor(private http: HttpClient) {}

  // getProfessionals
  getPatientsForProfesional(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals + '/patients');
  }

  getPrePatientsForProfesional(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals + '/prePatients');
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

  sendInvitationEmail(patientId): Observable<any> {
    return this.http.patch<any>(environment.baseUrl + this.professionals + '/sendInvitation/' + patientId, {});
  }
}

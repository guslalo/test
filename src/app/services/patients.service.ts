import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
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

  createPrePatient(patientObject): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.patients + '/prePatient', patientObject);
  }
}

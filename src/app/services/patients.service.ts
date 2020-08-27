import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private professionals = 'v1/professionals';

  constructor(private http: HttpClient) {}

  // getProfessionals
  getPatientsForProfesional(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals + '/patients');
  }
}

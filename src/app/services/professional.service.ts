import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private professionals = 'v1/professionals';

  constructor(private http: HttpClient) {}

  //getProfessionals
  getProfessionals(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals);
  }

  //createProfessionals
  createProfessionals(professional): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.professionals, { professional });
  }
}
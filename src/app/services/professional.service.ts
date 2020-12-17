import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private professionals = 'v1/professionals';
  private professionalSpecialties = 'v1/medical-specialties';
  private GetProfessionalsBySpecialtyId = 'v1/professionals/';
  private opts = [];
  
  constructor(private http: HttpClient) { }

  //getProfessionals
  getProfessionals(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionals);
  }

  //createProfessionals
  createProfessionals(professional): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.professionals, { professional });
  }

  //getProfessionals
  getProfessionalSpecialties(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.professionalSpecialties);
  }

  //getProfessionals
  getProfessionalsBySpecialtyId(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.GetProfessionalsBySpecialtyId + '/' + id);
  }

  search(query) {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(environment.baseUrl + this.professionals + '/search?filter=' + query)
        .pipe(tap(data => this.opts = data))
  }

  findBySpecialtyId(id){
    return this.http.get<any>(environment.baseUrl + this.professionals + '/specialty/' + id)
  }
}

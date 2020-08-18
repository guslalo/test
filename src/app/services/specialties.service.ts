import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SpecialtiesService {
  
  private medicalSpecialties = 'v1/medical-specialties'; 
  private specialties = 'v1/administrative/specialties';

  constructor(private http: HttpClient) {}

  //specialties
  getSpecialties(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.specialties);
  }

   //specialties
   getSpecialtiesId(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.specialties + '/' + id);
  }



  //specialties
  getMedicalSpecialties(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.medicalSpecialties);
  }

}

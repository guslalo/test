import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesService {
  
  private medicalSpecialties = 'v1/medical-specialties';
  private medicalSpecialties2 = 'v1/professionals/specialties';   
  private specialties = 'v1/administrative/specialties';

  constructor(private http: HttpClient) {}

  //specialties
  getSpecialties(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.specialties);
  }

  //specialties
  getMedicalSpecialtiesId(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.specialties + '/' + id);
  }

    //specialties
    getSpecialtiesId2(): Observable<any> {
      return this.http.get<any>(environment.baseUrl + this.medicalSpecialties2);
    }
  



  //specialties
  getMedicalSpecialties(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.medicalSpecialties);
  }
}

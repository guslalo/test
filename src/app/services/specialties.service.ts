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
  private medicalSpecialtiesCoordinator = 'v1/coordinator/specialties';
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
  patchMedicalSpecialtiesId(id): Observable<any> {
    return this.http.patch<any>(environment.baseUrl + this.specialties + '/' + id, { });
  }

  //specialties
  getSpecialtiesForProfessional(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.medicalSpecialtiesCoordinator + '/' + id);
  }

  //specialties
  getSpecialtiesId(id): Observable<any> {
    return this.http.patch<any>(environment.baseUrl + this.specialties + '/' + id, {});
  }

  //specialties
  getMedicalSpecialties(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.medicalSpecialties);
  }
}

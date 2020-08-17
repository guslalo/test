import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SymptomsService {
  
  private symptoms = 'v1/symptoms';

  constructor(private http: HttpClient) {}

  //specialties
  getSymptoms(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.symptoms);
  }

}

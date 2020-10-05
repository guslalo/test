import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  private account = 'v1/account/profile';
  private patients = 'v1/patient';
  private photo = 'v1/account/profilePhoto';
  private politicas = 'v1/clinic/terms/';

  constructor(private http: HttpClient) {}

  // get data
  getPoliticas(clinicId): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.politicas + clinicId, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }),
    });
  }


}

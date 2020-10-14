import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminitrativeService {
  private account = 'v1/account/profile';
  private patients = 'v1/patient';
  private photo = 'v1/account/profilePhoto';
  private politicas = 'v1/clinic/terms/';
  private search = 'v1/administrative/diagnostic/';

  constructor(private http: HttpClient) {}



  searchDiagnostic(type, string): Observable<any> {
    let params = new HttpParams();
    params = params.append('filter', string);
    return this.http.get<any>(environment.baseUrl + this.search + type, { params:params })
  }
  



}

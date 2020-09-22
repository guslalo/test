import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private home = 'v1/home';
  private tips = 'v1/tips';

  private patients = 'v1/patient';
  private photo = 'v1/account/profilePhoto';

  constructor(private http: HttpClient) {}

  // get data
  getTips(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.tips);
  }

  // get data
  /*
  updateUser(userData): Observable<any> {
    console.log(userData);
    return this.http.put<any>(environment.baseUrl + this.account, userData, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }),
    });
  }*/
}

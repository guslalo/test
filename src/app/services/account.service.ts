import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account = 'v1/account/profile';
  private patients = 'v1/patient';
  private photo = 'v1/account/profilePhoto';

  constructor(private http: HttpClient) {}

  // get data
  getUser(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.account, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }),
    });
  }

  // get data
  updateUser(userData): Observable<any> {
    console.log(userData);
    return this.http.put<any>(environment.baseUrl + this.account, userData, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }),
    });
  }

  // get data
  updateProfilePhoto(photo): Observable<any> {
    return this.http.put<any>(
      environment.baseUrl + this.photo,
      { photo: photo },
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }) }
    );
  }
}

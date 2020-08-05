import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = 'v1/account/register';
  private confirmUrl = 'v1/account/confirm-email';

  constructor(private http: HttpClient, private router: Router) {}

  // post registerUser
  registerUser(personalData, birthData, addressData, password): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.registerUrl, {
      personalData,
      birthData,
      addressData,
      password,
    });
  }

  confirmAccount(idUser, code) {
    return this.http.get<any>(environment.baseUrl + this.confirmUrl + `/${idUser}/${code}`);
  }

  //{{BASE_URL}}/api/v1/account/confirm-email/:userId/:code
}

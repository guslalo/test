import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn:'root'})


export class AuthenticationService {
  private loginUrl = 'v1/access/login-web';
  private accessWebUrl = 'v1/access/access-web';
  private recoveryUrl = 'v1/account/generate-reset-password';
  private resetPassUrl = 'v1/account/reset-password';
  private changePass = 'v1/account/change-password';
  private logoutUrl = '/';
  private httpClient: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend, private router: Router) {
    this.httpClient = new HttpClient(handler);
  }

  // post loginUser
  loginUser(username, password): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.loginUrl, { username, password });
  }

  recoveryPassword(data): Observable<any> {
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this.http.post<any>(environment.baseUrl + this.recoveryUrl, { email: data },  { headers });
  }

  resetPassword(token, password, id): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.resetPassUrl + `/${id}`, { token, password });
  }

  // cambiar pass
  changePassword(password, newPassword): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.changePass, { password, newPassword });
  }

  // ACCESs choose context
  accessWeb(clinicProfileId): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.accessWebUrl, { clinicProfileId });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    document.location.href = this.logoutUrl;
  }
}

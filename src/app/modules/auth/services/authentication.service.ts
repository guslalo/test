import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/urlGlobal.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    private baseUrl = this.globalService.dominioURL + '/sso-common/v1/authorize';
    private logoutUrl = this.globalService.logoutUrl;
    private apiKey = this.globalService.apiKey;
    private clientSecret = this.globalService.clientSecret;
    private baseUrlPaso1 = this.globalService.dominioURL + '/get-login-access/authorize';
    private baseUrlPaso2 = this.globalService.dominioURL + '/oauth2/userAuthorize?test=test';
    private baseUrlPaso3 = this.globalService.dominioURL + '/oauth2/token';
    private baseUrlPaso3E = this.globalService.dominioURL + '/oauth2E/token';

    constructor(private http: HttpClient,
        private globalService: GlobalService,
        private cookieService: CookieService,
        private router: Router) { const v = false; }

    login(apigee_sessionid: String): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'application': 'CORPORATE'
            })
        };
        return this.http.post<any>(this.baseUrl, apigee_sessionid, httpOptions);
    }

    loginPaso1(apigee_sessionid: String): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };
        return this.http.post<any>(this.baseUrlPaso1 + '?apikey=' + this.apiKey , apigee_sessionid, httpOptions);
    }

    loginPaso2(act_token: String): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };
        const body = 'apikey=' + this.apiKey + '&act_token=' + act_token + '&response_type=code';
        return this.http.post<any>(this.baseUrlPaso2, body, httpOptions);
    }

    loginPaso3(datacode: String): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };
        const body = 'grant_type=authorization_code&client_secret=' + this.clientSecret + '&client_id=' + this.apiKey + '&code=' +
        datacode + '&redirect_uri=https://myloginOauth.net/auth-code';
        return this.http.post<any>(this.baseUrlPaso3, body, httpOptions);
    }

    refresh_token(refreshToken: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };
        const body = 'grant_type=refresh_token&client_secret=' + this.clientSecret + '&client_id=' + this.apiKey + '&refresh_token='
        + refreshToken;
        return this.http.post<any>(this.baseUrlPaso3, body, httpOptions);
    }


    refresh_tokenEjecutivo(refreshToken: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };
        const body = 'grant_type=refresh_token&client_secret=' + this.clientSecret + '&client_id=' + this.apiKey + '&refresh_token='
        + refreshToken;
        return this.http.post<any>(this.baseUrlPaso3E, body, httpOptions);
    }



    logout() {
        localStorage.clear();
        document.location.href = this.logoutUrl;
    }
}

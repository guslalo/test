import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private loginUrl = 'v1/account/login';

    constructor(
        private http: HttpClient,
        private router: Router) {  }

    // post loginUser
    loginUser(username, password): Observable<any> {
        /*const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'application': 'CORPORATE'
            })
        };*/
        return this.http.post<any>( environment.baseUrl + this.loginUrl , { username, password } );
    }

    /*
    logout() {
        localStorage.clear();
        document.location.href = this.logoutUrl;
    }*/
}

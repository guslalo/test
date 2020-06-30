import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class RegisterService {

    private registerUrl = 'v1/account/register';

    constructor(
        private http: HttpClient,
        private router: Router) {  }

    // post registerUser
    registerUser(username, password): Observable<any> {
        return this.http.post<any>( environment.baseUrl + this.registerUrl , { username, password } );
    }

}

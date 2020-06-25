import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class UsersService {

    private users = 'users/';
    
    constructor(private http: HttpClient, private router: Router) {  }

    // get user
    getusers( idUser?:any ): Observable<any> {
        if(idUser) {
            return this.http.get<any>( environment.baseUrl + this.users + idUser);
        } else {
            return this.http.get<any>( environment.baseUrl + this.users);
        }
    }


    //user current
    getUserCurrent(user){
        return user;
    }

}

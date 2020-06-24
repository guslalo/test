import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = 'https://reqres.in/api/login';
  

  constructor(private http: HttpClient) {
  
  }

  // post loginUser
  loginUser(email, password): Observable<any> {
    return this.http.post<any>(this.url, {email, password});
  }
 
  
}
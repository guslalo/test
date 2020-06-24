import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl = 'https://reqres.in/api/colors';

  constructor(private http: HttpClient) {
  
  }

  // get loginUser
  loginUser(page:any): Observable<any> {
    return this.http.get<any>(this.loginUrl);
  }
 
  
}
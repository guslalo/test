import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = 'https://jsonplaceholder.typicode.com/';
  

  constructor(private http: HttpClient) {
  
  }

  // get colors
  getUsers(page:any): Observable<any> {
    return this.http.get<any>(this.url + `users`);
  }
 
  
}
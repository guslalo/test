import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //end points
  private userEndpoint = 'v1/users';

  constructor(private http: HttpClient) {}

  //GET availability/blocked
  getUsers(userType): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${this.userEndpoint}/${userType}`);
  }
}

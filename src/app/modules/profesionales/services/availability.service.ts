import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {
  private availability = 'v1/availability';
  private blocked = '/blocked';
  
  constructor(private http: HttpClient) {  }

  //getAvailability
  getAvailability( ): Observable<any> {
    return this.http.get<any>(  environment.baseUrl + this.availability );
  }

  //postAvailability
  postAvailability( 
    objective,
    specialty,
    appointmentDuration,
    endDate,
    dailyDetails
     ): Observable<any> {
  
    return this.http.post<any>(  environment.baseUrl + this.availability, { 
      objective,
      specialty,
      appointmentDuration,
      endDate,
      dailyDetails
    });
  }

  //availability/blocked
  getAvailabilityBlocked( ): Observable<any> {
    return this.http.get<any>(  environment.baseUrl + this.availability + this.blocked );
  }

  //availability/blocked
  postAvailabilityBlocked( 
    date,
    start,
    end ): Observable<any> {
    return this.http.post<any>(  environment.baseUrl + this.availability + this.blocked , { 
      date,
      start,
      end});
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {
  private availability = 'v1/availability';
  
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

}

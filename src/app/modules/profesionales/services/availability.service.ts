import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private availability = 'v1/availability';
  private blocked = 'v1/blocked-day';

  constructor(private http: HttpClient) {}

  //getAvailability
  getAvailability(id?: any): Observable<any> {
    if (id) {
      return this.http.get<any>(environment.baseUrl + this.availability + `/${id}`);
    } else {
      return this.http.get<any>(environment.baseUrl + this.availability);
    }
  }

  //postAvailability
  postAvailability(objective, specialty, appointmentDuration, starDate, endDate, dailyDetails): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.availability, {
      objective,
      specialty,
      appointmentDuration,
      starDate,
      endDate,
      dailyDetails,
    });
  }

  //PÚT Availability
  putAvailability(id, objective, specialty, appointmentDuration, starDate, endDate, dailyDetails): Observable<any> {
    return this.http.put<any>(environment.baseUrl + this.availability, {
      id,
      objective,
      specialty,
      appointmentDuration,
      starDate,
      endDate,
      dailyDetails,
    });
  }

  //post state Availability

  //GET availability/blocked
  getAvailabilityBlocked(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.blocked);
  }

  //POST availability/blocked
  postAvailabilityBlocked(date, start, end): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.blocked, {
      date,
      start,
      end,
    });
  }

  //deleteAvailabilit
  deleteAvailability(idDelete: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + this.availability + `/${idDelete.id}`);
  }

  //delete BLOCK
  deleteBlock(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<any>(environment.baseUrl + this.blocked + `/${id}`);
  }
}

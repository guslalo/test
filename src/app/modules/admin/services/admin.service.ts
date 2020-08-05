import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //end points
  private availability = 'v1/availability';
  private blocked = 'v1/blocked-day';

  constructor(private http: HttpClient) {}

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

  //GET availability/blocked
  getAvailabilityBlocked(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.blocked);
  }

  //deleteAvailabilit
  deleteAvailability(idDelete: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + this.availability + `/${idDelete.id}`);
  }
}

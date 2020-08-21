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
  private availabilityState = 'v1/availability/state';

  

  constructor(private http: HttpClient) {}

  // getAvailability
  getAvailability(id?: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('availabilityId', id);
    if (id) {
      return this.http.get<any>(environment.baseUrl + this.availability,  {params: params});
    } else {
      return this.http.get<any>(environment.baseUrl + this.availability);
    }
  }

  // updateState
  updateState(id, state ): Observable<any> {
    console.log( id, state)
    return this.http.post<any>(environment.baseUrl + this.availabilityState, {
      id: id, isActive: state
    });
  }


  // postAvailability
  postAvailability(administrativeDetails, professionalDetails, dateDetails): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.availability, {
      administrativeDetails,
      professionalDetails,
      dateDetails
    });
  }

  // PÚT Availability
  putAvailability( 
    id,
    administrativeDetails,
    professionalDetails,
    dateDetails): Observable<any> {
    return this.http.put<any>(environment.baseUrl + this.availability, {
      id,
      administrativeDetails,
      professionalDetails,
      dateDetails
    });
  }

  // post state Availability

  // GET availability/blocked
  getAvailabilityBlocked(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.blocked);
  }

  // POST availability/blocked
  postAvailabilityBlocked(date, start, end): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.blocked, {
      date,
      start,
      end,
    });
  }

  // deleteAvailabilit
  deleteAvailability(idDelete: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + this.availability + `/${idDelete.id}`);
  }

  // delete BLOCK
  deleteBlock(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<any>(environment.baseUrl + this.blocked + `/${id}`);
  }
}

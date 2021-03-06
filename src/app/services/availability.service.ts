import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private availability = 'v1/availability';
  private blocked = 'v1/blocked-day';
  private availabilityState = 'v1/availability/state';
  private coordinator = 'v1/coordinator';

  constructor(private http: HttpClient) {}

  //http params availabilityId
  idParams(id) {
    let params = new HttpParams();
    params = params.append('availabilityId', id);
    return params;
  }

  // getAvailability
  getAvailability(id?: any): Observable<any> {
    let params = this.idParams(id);
    if (id) {
      return this.http.get<any>(environment.baseUrl + this.availability, { params: params });
    } else {
      return this.http.get<any>(environment.baseUrl + this.availability);
    }
  }

  getAvailabilityCoordinator(id: any): Observable<any> {
    let params = this.idParams(id);
    return this.http.get<any>(environment.baseUrl + this.coordinator + '/availability', { params: params });
  }

  // updateState
  updateState(id, state): Observable<any> {
    let params = this.idParams(id);
    console.log(id, state);
    return this.http.post<any>(
      environment.baseUrl + this.availabilityState,
      { id: id, isActive: state },
      { params: params }
    );
  }

  // updateState
  updateStateCoordinator(id, state): Observable<any> {
    let params = this.idParams(id);
    console.log(id, state);
    return this.http.post<any>(
      environment.baseUrl + this.coordinator + '/availability/state',
      { id: id, isActive: state },
      { params: params }
    );
  }

  // postAvailability
  postAvailability(administrativeDetails, professionalDetails, dateDetails): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.availability, {
      administrativeDetails,
      professionalDetails,
      dateDetails,
    });
  }

  postAvailabilityCoordinator(administrativeDetails, professionalDetails, dateDetails): Observable<any> {
    console.log(dateDetails);

    return this.http.post<any>(environment.baseUrl + this.coordinator + '/availability', {
      administrativeDetails,
      professionalDetails,
      dateDetails,
    });
  }

  // P??T Availability
  putAvailability(id, administrativeDetails, professionalDetails, dateDetails): Observable<any> {
    let params = this.idParams(id);
    return this.http.put<any>(
      environment.baseUrl + this.availability,
      {
        administrativeDetails,
        professionalDetails,
        dateDetails,
      },
      { params: params }
    );
  }

  putAvailabilityCoordinator(id, administrativeDetails, professionalDetails, dateDetails): Observable<any> {
    let params = this.idParams(id);
    return this.http.put<any>(
      environment.baseUrl + this.coordinator + '/availability',
      {
        administrativeDetails,
        professionalDetails,
        dateDetails,
      },
      { params: params }
    );
  }

  // post state Availability

  // GET availability/blocked
  getAvailabilityBlocked(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.blocked);
  }

  // POST availability/blocked
  postAvailabilityBlocked(date, start?, end?): Observable<any> {
    if (start && end) {
      return this.http.post<any>(environment.baseUrl + this.blocked, {
        date,
        range: {
          start: start,
          end: end,
        },
      });
    } else {
      return this.http.post<any>(environment.baseUrl + this.blocked, {
        date,
      });
    }
  }

  // deleteAvailabilit
  deleteAvailability(id: any): Observable<any> {
    let params = this.idParams(id.id);
    return this.http.delete<any>(environment.baseUrl + this.availability, { params: params });
  }

  // deleteAvailabilit
  deleteAvailabilityCoordinator(id: any): Observable<any> {
    let params = this.idParams(id.id);
    return this.http.delete<any>(environment.baseUrl + this.coordinator + '/availability', { params: params });
  }

  // delete BLOCK
  deleteBlock(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('blockedDayId', id);

    console.log(id);
    return this.http.delete<any>(environment.baseUrl + this.blocked + `/`, { params: params }); // `/`
  }
}

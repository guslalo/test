import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendarService {
  private blocks = 'v1/blocks/query';

  constructor(private http: HttpClient) {}

  //postBlocks
  postBlocks(date, specialtyId?, professionalId?): Observable<any> {
    if (specialtyId) {
      console.log(date, { specialtyId: specialtyId });
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
        specialtyId: specialtyId,
      });
    } else {
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
      });
    }
  }

  //postBlocks
  postBlocksProfessionalId(date, professionalId?): Observable<any> {
    if (professionalId) {
      console.log(date, { professionalId: professionalId });
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
        professionalId: professionalId,
      });
    } else {
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
      });
    }
  }
}

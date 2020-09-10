import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SymptomsService {
  
  private symptoms = 'v1/symptoms';
  private symptom = 'v1/appointments/symptom/';

  constructor(private http: HttpClient) {}

  //specialties
  getSymptoms(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.symptoms);
  }

  //delete specialties
  deleteSymptoms(appointmentId, symptom): Observable<any> {
    console.log(appointmentId, symptom)
    const params = new HttpParams()
    .set('appointmentId', appointmentId)
    .set('symptomId', symptom);

    return this.http.delete<any>(environment.baseUrl + this.symptom, { params: params } );
  }

}

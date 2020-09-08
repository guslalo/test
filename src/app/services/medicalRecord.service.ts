import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {
  private medicalRecord = 'v1/medical-record/';
  private antecedent = 'v1/medical-record/antecedent/';
  private addExamen = 'v1/medical-record/add-exam';
  private appointements = 'v1/appointments/';

  constructor(private http: HttpClient) {}

  //getByUserId
  getByUserId(userId?): Observable<any> {
    // console.log(userId);
    if (userId) {
      return this.http.get<any>(environment.baseUrl + this.medicalRecord + userId);
    } else {
      return this.http.get<any>(environment.baseUrl + this.medicalRecord);
    }
  }

  getTimeline(userId?): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointements + 'timeline' + '?userId=' + userId);
  }

  //putAddAntecedent
  putAddExamen(object, userId?): Observable<any> {
    return this.http.put<any>(environment.baseUrl + this.addExamen + '?userId=' + userId, {
      documentDetails: {
        name: object.name,
        type: object.type,
        data: object.file,
      },
    });
  }

  //putAddAntecedent
  putAddAntecedent(antecedent, value): Observable<any> {
    let params = new HttpParams();
    params = params.append('antecedent', antecedent);
    return this.http.put<any>(environment.baseUrl + this.antecedent + antecedent, { value });
  }

  //deleteAntecedent
  deleteAntecedent(antecedent, id): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + this.antecedent + antecedent + '/' + id);
  }
}

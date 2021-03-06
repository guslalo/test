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

  downloadFromProfessional(userId?): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.medicalRecord + userId);
  }

  getTimeline(userId?): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointements + 'timeline' + '?userId=' + userId);
  }

  //putAddAntecedent
  putAddExamen(object, userId?, appointmentId?): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('appointmentId', appointmentId);

    return this.http.put<any>(environment.baseUrl + this.addExamen,{
      documentDetails: {
        name: object.name,
        type: object.type,
        data: object.file,
      },
    },   { params: params } );
  }


  //putAddAntecedent
  putAddAntecedent(antecedent, value): Observable<any> {
    let params = new HttpParams();
    params = params.append('antecedent', antecedent);
    return this.http.put<any>(environment.baseUrl + this.antecedent + antecedent, { value });
  }

  //putAddAntecedent
  postAddAntecedent(antecedent, value): Observable<any> {
    let params = new HttpParams();
    params = params.append('antecedent', antecedent);
    return this.http.post<any>(environment.baseUrl + this.antecedent + antecedent, { value });
  }

  //deleteAntecedent
  deleteAntecedent(antecedent, id): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + this.antecedent + antecedent + '/' + id);
  }

  hasAntecedents(antecedent, boolean): Observable<any> {
    console.log(antecedent, boolean);
    return this.http.put<any>(environment.baseUrl + this.medicalRecord + 'has-antecedent/' + antecedent, {
      hasAntecedent: boolean,
    });
  }
}

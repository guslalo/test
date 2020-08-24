import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class MedicalRecordService {
  
  private medicalRecord = 'v1/medical-record/';
  private antecedent =  'v1/medical-record/antecedent/';
  private addExamen = 'v1/medical-record/add-exam';
  
  

  constructor(private http: HttpClient) {}

  //getByUserId
  getByUserId(id?): Observable<any> {
    if(id) {
      let params = new HttpParams();
      params = params.append('userId', id);
      return this.http.get<any>(environment.baseUrl + this.medicalRecord, { params: params} );
    } else {

      return this.http.get<any>(environment.baseUrl + this.medicalRecord );
    }

  }  

  //putAddAntecedent
  putAddExamen(object): Observable<any> {
    return this.http.put<any>(environment.baseUrl + this.addExamen, { 
      fileName:object.fileName, 
      documentType:object.documentType,
      madeBy:object.madeBy, 
      file:object.file
    } );
  }

  //putAddAntecedent
  putAddAntecedent(antecedent, value): Observable<any> {
    let params = new HttpParams();
    params = params.append('antecedent', antecedent);
    return this.http.put<any>(environment.baseUrl + this.antecedent + antecedent, { value } );
  }

  //deleteAntecedent
  deleteAntecedent(antecedent, id): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + this.antecedent + antecedent + '/' + id );
  }

}

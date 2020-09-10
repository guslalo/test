import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private uploadUrl = 'v1/documents/appointment/upload';
  public urlDownload = 'v1/medical-record/download/';
  public urlUpload = 'v1/medical-record/add-exam?userId=';

  constructor(private http: HttpClient, private currentUserService: CurrentUserService) {}

  download() {
    // console.log(this.currentUserService.currentUser);
    return environment.baseUrl + this.urlDownload;
  }

  //specialties
  postDocument(id:string, documentDetails): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.urlUpload + id, {
      id,
      documentDetails,
    });
  }

   //postDocumentAppointment
   postDocumentAppointment(appointmentId:string, documentDetails): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.uploadUrl, {
      appointmentId,
      documentDetails,
    });
  }
}

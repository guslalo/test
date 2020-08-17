import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AgendarService {

  private blocks = 'v1/blocks/query';
  
  constructor(private http: HttpClient) { }

  //postBlocks
  postBlocks(date): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.blocks, {
      date
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = 'users/';
  private users2 = 'https://reqres.in/api/';
  private cepUrl = 'v1/identification/location' 

  constructor(private http: HttpClient, private router: Router) {}


  //cep data
  getLocationDataFromCep(cep): Observable<any> {
    let params = new HttpParams();
    params = params.append('cep',cep);
    return this.http.get<any>(environment.baseUrl + this.cepUrl, {params:params});
  }

  // get user
  getusers(idUser?: any): Observable<any> {
    if (idUser) {
      return this.http.get<any>(this.users2 + this.users + idUser);
    } else {
      return this.http.get<any>(this.users2 + this.users);
    }
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/countries');
  }

  getStates(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/states');
  }

  getPrevissions(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + '/v1/')
  }

  getCities(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/cities');
  }

  getCitiesForUf(stateId): Observable<any> {
    let params = new HttpParams();
    params = params.append('stateId',stateId);
    return this.http.get<any>(environment.baseUrl + 'v1/cities', {params:params});
  }

  getCityForId(cityId): Observable<any> {
    let params = new HttpParams();
    params = params.append('cityId',cityId);
    return this.http.get<any>(environment.baseUrl + 'v1/cities', {params:params});
  }

  getStatesId(stateId): Observable<any> {
    let params = new HttpParams();
    params = params.append('stateId',stateId);
    return this.http.get<any>(environment.baseUrl + 'v1/states', {params:params});
  }

  getStatesId2(stateId): Observable<any> {
    let params = new HttpParams();
    params = params.append('stateId',stateId);
    return this.http.get<any>(environment.baseUrl + 'v1/states', {params:params});
  }


  getBreeds(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/breeds');
  }

  getEducations(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/educations');
  }

  getFamiliarSituations(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/familiar-situations');
  }

  getIssuingEntities(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/issuing-entities');
  }

  educations(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'v1/educations');
  }
}

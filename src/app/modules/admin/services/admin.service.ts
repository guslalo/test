import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //end points
  private userEndpoint = 'v1/users';
  private profileEndpoint = 'v1/administrative/profiles';

  constructor(private http: HttpClient) {}

  //GET availability/blocked
  getUsers(userType): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${this.userEndpoint}/${userType}`);
  }

  getProfiles(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${this.profileEndpoint}`);
  }

  createUser(userType, userObject): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${this.userEndpoint}/${userType}`, {
      identificationData: userObject.identificationData,
      personalData: userObject.personalData,
      waitingRooms: userObject.waitingRooms,
      profileData: userObject.profileDataForm,
      /* PROFESSIONAL ONLY */
      specialities: userObject.specialities,
      educationData: userObject.educationData,
      /* PROFESSIONAL ONLY */
      password: userObject.password,
      confirmPassword: userObject.confirmPassword,
      profiles: userObject.profiles,
      /* PATIENT ONLY */
      isTutor: userObject.isTutor,
      /* PATIENT ONLY */
    });
  }
}

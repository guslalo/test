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
    // console.log(userType);
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

  getUserById(userType, userId): Observable<any> {
    // console.log(userType, userId);
    return this.http.get<any>(`${environment.baseUrl}${this.userEndpoint}/?userType=${userType}&userId=${userId}`);
  }

  updateUser(userType, userObject): Observable<any> {
    console.log(userType);
    let role;
    switch (userType) {
      case 'admins':
        role = 'admin';
        break;
      case 'coordinators':
        role = 'coordinator';
        break;
      case 'professionals':
        role = 'professional';
        break;
      case 'patients':
        role = 'patient';
    }
    return this.http.put<any>(`${environment.baseUrl}${this.userEndpoint}/${role}`, userObject);
  }

  deactivateUser(userId) {
    // console.log(userId);
    return this.http.delete<any>(`${environment.baseUrl}${this.userEndpoint}/${userId}`);
  }

  sendInvitationEmail(userId) {
    console.log(userId);
    return this.http.patch<any>(`${environment.baseUrl}${this.userEndpoint}/sendInvitation`, { userId: userId });
  }

  createProfile(profileObject): Observable<any> {
    // console.log(profileObject);
    return this.http.post<any>(`${environment.baseUrl}${this.profileEndpoint}`, profileObject);
  }

  getProfileById(profileId): Observable<any> {
    // console.log(profileId);
    return this.http.get<any>(`${environment.baseUrl}${this.profileEndpoint}/${profileId}`);
  }

  updateProfile(profileObject, profileId): Observable<any> {
    // console.log(profileObject);
    return this.http.put<any>(`${environment.baseUrl}${this.profileEndpoint}/${profileId}`, profileObject);
  }
}

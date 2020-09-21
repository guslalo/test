import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FileUtilsService } from 'src/app/services/file-utils.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // end points
  private userEndpoint = 'v1/users';
  private profileEndpoint = 'v1/administrative/profiles';
  private clinicEndpoint = 'v1/clinic';
  private waitingRoomsEndpoint = 'v1/waiting-rooms'

  constructor(private http: HttpClient, private fileUtils: FileUtilsService) { }

  // GET availability/blocked
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
      addressData: userObject.addressData,
      waitingRooms: userObject.waitingRooms,
      profileData: userObject.profileDataForm,
      /* PROFESSIONAL ONLY */
      specialities: userObject.specialities,
      professionalData: userObject.professionalData,
      /* PROFESSIONAL ONLY */
      password: userObject.password,
      confirmPassword: userObject.confirmPassword,
      profiles: userObject.profiles,
      /* PATIENT ONLY */
      isTutor: userObject.isTutor || false,
      /* PATIENT ONLY */
    });
  }

  getUserById(userType, userId): Observable<any> {
    // console.log(userType, userId);
    return this.http.get<any>(`${environment.baseUrl}${this.userEndpoint}/?userType=${userType}&userId=${userId}`);
  }

  updateUser(userType, userObject): Observable<any> {
    // admins -> admin
    let role = userType.slice(0, -1);
    return this.http.put<any>(`${environment.baseUrl}${this.userEndpoint}/${role}`, userObject);
  }

  changeUserStatus(userId, status) {
    // console.log(userId);
    return this.http.patch<any>(`${environment.baseUrl}${this.userEndpoint}/${userId}/?status=${status}`, {});
  }

  sendInvitationEmail(usersIds) {
    // console.log(userId);
    return this.http.patch<any>(`${environment.baseUrl}${this.userEndpoint}/sendInvitation`, { users: usersIds });
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

  deactivateProfile(profileId): Observable<any> {
    // console.log(profileObject);
    return this.http.delete<any>(`${environment.baseUrl}${this.profileEndpoint}/${profileId}`);
  }
  updateClinicInfo(clinicId: string, clinicInfoObject: any) {
    return this.http.put<any>(`${environment.baseUrl}${this.clinicEndpoint}/${clinicId}`, clinicInfoObject);
  }

  updateModalityStatus(status) {
    return this.http.put<any>('', {});
  }

  updateModalityItem(modalityData: any) {
    console.log('Modality Item', modalityData)
    return this.http.put<any>(`${environment.baseUrl}${this.clinicEndpoint}/update-immediate-module`, modalityData);
  }

  getClinic(clinicId: string) {
    return this.http.get<any>(`${environment.baseUrl}${this.clinicEndpoint}/${clinicId}`);
  }

  async uploadTerms(file: any, clinicId: string) {
    let base64 = await this.fileUtils.getBase64(file)
    return this.http.post<any>(`${environment.baseUrl}${this.clinicEndpoint}/upload-term/${clinicId}`, {
      term: "use-term",
      document: {
        data: base64,
        name: file.name
      }
    }).pipe(take(1)).toPromise();
  }

  async uploadPrivacy(file: any, clinicId: string) {
    let base64 = await this.fileUtils.getBase64(file)
    return this.http.post<any>(`${environment.baseUrl}${this.clinicEndpoint}/upload-term/${clinicId}`, {
      term: "privacy-term",
      document: {
        data: base64,
        name: file.name
      }
    }).pipe(take(1)).toPromise();
  }

  async uploadAgreement(file: any, clinicId: string) {
    let base64 = await this.fileUtils.getBase64(file)
    return this.http.post<any>(`${environment.baseUrl}${this.clinicEndpoint}/upload-term/${clinicId}`, {
      term: "telemedicine-consent",
      document: {
        data: base64,
        name: file.name
      }
    }).pipe(take(1)).toPromise();
  }

  getImmediateData() {
    return this.http.get<any>(`${environment.baseUrl}${this.clinicEndpoint}/immediate-module`);
  }

  getWaitingRooms() {
    return this.http.get<any>(`${environment.baseUrl}${this.waitingRoomsEndpoint}`);
  }

  updateAccesMode(clinicId: string, mode: string, enabled: boolean) {
    return this.http.put<any>(`${environment.baseUrl}${this.clinicEndpoint}/update-access-mode/${clinicId}`, { mode, enabled });
  }
}

import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient,private router: Router) {
    this.angularFireMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (data) => {
        this.addDevise(data).subscribe((data)=> console.log(data), (error)=> console.log(error))
      },
      (error) => console.log(error)
    )
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload:any) => {
      console.log('new message received. ', payload);
      let not: Notification = new Notification(payload.notification.title,{
        body: payload.notification.body,
      })
      not.onclick = (event) =>{

        let role = JSON.parse(localStorage.getItem('currentUser')).role
        if(payload.data.action == "goToAppointment"){
          if(role == "professional"){
            this.router.navigate([`/app-professional/crear-ficha-consulta`, payload.data.id])
          }else if(role == "patient" ){
            this.router.navigate([`/app-paciente/teleconsulta`, payload.data.id])
          }
        }else if(payload.data.action == "goToFinishedAppointment"){
          this.router.navigate(['/app-paciente/mis-consultas/consulta', payload.data.id])  
        }else if(payload.data.action == "goToNextAppointments"){
          this.router.navigate(['/app-coordinator/#child1'])
        }else if(payload.data.action == "goToWaitingRoom"){
          this.router.navigate(['/app-coordinator/#child2'])
        }
        this.deleteNotification(payload._id).subscribe((data)=> console.log(data), (error)=> console.log(error))
      }
    });
  }

  

  getNotifications(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + 'v1/notifications')
  }

  addDevise(token:string): Observable<any>{
    return this.http.post<any>(environment.baseUrl + 'v1/notifications/set', {
      token,
      type:"WEB"
    })
  }

  deleteNotification(id:string): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        notificationId:id
      }
    }
    return this.http.delete<any>(environment.baseUrl + 'v1/notifications', options)
  }
}

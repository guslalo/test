import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
    firebase.messaging().onMessage((payload)=>{
      console.log(payload)
    })
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
        body: payload.notification.body
      })
      this.currentMessage.next(payload);
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

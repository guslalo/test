import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
    this.angularFireMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.addDevise(token).subscribe((data)=> console.log(data), (error)=> console.log(error))
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
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
}

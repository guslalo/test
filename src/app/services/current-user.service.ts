import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  currentUser:any = { };

 
  constructor() { 
    //localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    //localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}

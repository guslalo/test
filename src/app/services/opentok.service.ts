import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


import config from '../../config';

const sub = new Subject<boolean>();

@Injectable()
export class OpentokService {

  constructor() {}

  token: string;
  public toggleVideo: boolean;
  // Tu funcion para solicitar el cambio
  mostrarComponentes(mostrar: boolean = true): void {
    sub.next(mostrar);
  }

  // Tu observable, el cual se puede exponer y extender con otros operadores
  mostrarComponentesObs(): Observable<boolean> {
    return sub.asObservable();
  }

  toggleVideoemit() {
    return (this.toggleVideo = false);
  } /**/



  initSession(token, sessionId) {

  }

  connect() {

  }
}

import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdleEventsService {

  public inVideoCall$: EventEmitter<boolean>;
  public _videoCallState: boolean;
  public _videoStateTimer: any;

  constructor() {
    this.inVideoCall$ = new EventEmitter();
  }

  public inVideoCall(_state: boolean): void {
    this._videoCallState = _state

    console.log('STATE IDLE CALL', _state)

    if (this._videoCallState) {
      this._videoStateTimer = setInterval(() => {
        this.inVideoCall$.emit(this._videoCallState)
      }, 1000)
    } else {
      this.inVideoCall$.emit(this._videoCallState)
      clearInterval(this._videoStateTimer)
    }
  }
}

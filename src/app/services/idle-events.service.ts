import { EventEmitter, Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdleEventsService {

  public inVideoCall$: EventEmitter<boolean>;
  public _videoCallState: boolean;
  public _videoStateTimer: any;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private toastr: ToastrService
  ) {

    this.inVideoCall$ = new EventEmitter();
  }

  public attachMonitor(): void {
    if (location.pathname == '/') return

    console.log('Monitoring', environment.ttlSession, location.pathname)

    this.idle.setIdle(environment.ttlSession);
    this.idle.setTimeout(10);

    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.toastr.clear()
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'se acabo el tiempo, se reinicia la sesion!';
      this.timedOut = true;
      console.warn(this.idleState)
      this.logout()
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'La sesión se cerrará por inactividad en 10 segundos'

      console.warn(this.idleState)

      this.toastr.error(this.idleState, 'Cierre de Sesión', {
        timeOut: 10000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right',
      });

      console.warn(this.idleState)
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'te quedan ' + countdown + ' segundos!'
      console.warn(this.idleState)
    });

    this.keepalive.interval(15);
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  public inVideoCall(_state: boolean): void {
    this._videoCallState = _state

    console.warn('inVideoCall', this._videoCallState)

    if (this._videoCallState) {
      this._videoStateTimer = setInterval(() => {
        this.$broadcast('VideoCall', this._videoCallState)
      }, 1000)
    } else {
      this.$broadcast('VideoCall', this._videoCallState)
      this.startMonitoring()
      clearInterval(this._videoStateTimer)
    }
  }

  private $broadcast(Event: string, Data: any): void {
    switch (Event) {
      case 'VideoCall':
        this.stopMonitoring()
        this.inVideoCall$.emit(this._videoCallState)
        break;

      default:
        break;
    }
  }

  public startMonitoring(): void {
    this.idle.watch();
  }

  public stopMonitoring(): void {
    this.idle.stop()
  }

  private logout(): void {
    document.location.href = '/';
    localStorage.clear()
  }

  private reset(): void {
    this.idle.watch();
    this.timedOut = false;
  }
}

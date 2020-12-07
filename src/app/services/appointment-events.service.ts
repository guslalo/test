import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentEventsService {
  public updateAppointments$: EventEmitter<boolean>;

  constructor() {
    this.updateAppointments$ = new EventEmitter();
  }

  updateAppointments() {
    this.updateAppointments$.emit()
  }
}

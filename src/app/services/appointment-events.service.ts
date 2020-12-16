import { Injectable, EventEmitter, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentEventsService {
  private modalRef: TemplateRef<any>;

  public updateAppointments$: EventEmitter<boolean>;
  public filterProfessionalsByType$: EventEmitter<boolean>;
  public getSpecialtiesForProfessional$: EventEmitter<boolean>;
  public getProfessionals$: EventEmitter<boolean>;
  public getMedicalSpecialties$: EventEmitter<boolean>;
  public buildForm$: EventEmitter<boolean>;
  public setAppointmentReagendamiento$: EventEmitter<boolean>;
  public listAppointments$: EventEmitter<boolean>;
  public getProfessionalBlocks$: EventEmitter<boolean>;
  public setAppointmentCancelReasons$: EventEmitter<boolean>;
  public setAppointmentDetails$: EventEmitter<boolean>;

  constructor() {
    this.updateAppointments$ = new EventEmitter();
    this.filterProfessionalsByType$ = new EventEmitter();
    this.getSpecialtiesForProfessional$ = new EventEmitter();
    this.getProfessionals$ = new EventEmitter();
    this.getMedicalSpecialties$ = new EventEmitter();
    this.buildForm$ = new EventEmitter();
    this.setAppointmentReagendamiento$ = new EventEmitter();
    this.listAppointments$ = new EventEmitter();
    this.getProfessionalBlocks$ = new EventEmitter();
    this.setAppointmentCancelReasons$ = new EventEmitter();
    this.setAppointmentDetails$ = new EventEmitter();
  }

  updateAppointments() {
    this.updateAppointments$.emit()
  }

  filterProfessionalsByType(payload) {
    this.filterProfessionalsByType$.emit(payload)
  }

}

import { Injectable, EventEmitter, TemplateRef, HostListener } from '@angular/core';
import * as moment from 'moment';

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

  enableCheckDatesEnableButtons(array){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let now = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1) + 'Z';
    
    console.log('enableCheckDatesEnableButtons')

      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let dest = moment(element.dateDetails.scheduledAt)
        let _diff = dest.diff(now, 'minutes')
  
        if(_diff > 0){
          element.canUse = true
        }
      }
  }
}

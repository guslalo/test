import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentEventsService {
  public updateAppointments$: EventEmitter<boolean>;
  public filterProfessionalsByType$: EventEmitter<boolean>;

  constructor() {
    this.updateAppointments$ = new EventEmitter();
    this.filterProfessionalsByType$ = new EventEmitter();
  }

  updateAppointments() {
    this.updateAppointments$.emit()
  }

  filterProfessionalsByType(payload) {
    this.filterProfessionalsByType$.emit(payload)
  }

  createDisplayForSelect(item) {

    if (item.length) {
      return item.map(_e => {
        let name

        (_e.identificationData.hasOwnProperty('rg') && _e.identificationData.rg != '') ? name = 'RG - ' + _e.identificationData.rg + ' - ' : name = '';
        (_e.identificationData.hasOwnProperty('cns') && _e.identificationData.cns != '') ? name = 'CNS - ' + _e.identificationData.cns + ' - ' : name = '';
        (_e.identificationData.hasOwnProperty('cpf') && _e.identificationData.cpf != '') ? name = 'CPF - ' + _e.identificationData.cpf + ' - ' : name = '';

        name += _e.personalData.name + ' ' + _e.personalData.secondLastName

        let userId = _e.userData ? _e.userData[0]._id : 'NONE'

        return { id: _e._id, name, userId }
      })
    } else {
      return []
    }

  }
}

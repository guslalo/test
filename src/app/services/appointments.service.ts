import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { PatientsService } from './patients.service';
import { AppointmentEventsService } from './appointment-events.service';
import { ProfessionalService } from './professional.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private appointments = 'v1/appointments';
  private doctors = 'v1/doctors';
  private session = '/session';
  private reserve = '/reserve';
  private coordinators = 'v1/coordinator';
  private consolidate = '/consolidate';
  private reschedule = '/reschedule';
  private pagoStatus = 'v1/appointments/payment/status/';
  private inmediateAppointment = 'v1/administrative/immediate/state';
  private inmediate = 'v1/appointments/immediate/';
  private immediateConsolidate = 'v1/appointments/immediate/consolidate';
  private pagoStatusInmediate = 'v1/appointments/immediate/status';
  private waitingForRooms = 'v1/waiting-rooms';
  private waitingAppointmentsForRooms = this.inmediate;
  private appointmentInmediate = 'v1/appointments/immediate/attend';
  private getSibrare = 'v1/appointments/sibrare-url';
  private blocks = 'v1/blocks/query';
  private sibrareStatus = 'v1/appointments/sibrare/status';
  private sibrareStatusVerifiedSibrareDocuments = 'v1/appointments/sibrare/documents';
  private sibrareDocumentUrl = 'v1/appointments/sibrare/document-url';
  private professionalData = 'v1/appointments/professional/';
  private cancel = 'v1/appointments/cancel'
  private subirAntecedentesMedico = 'v1/appointments/antecedents/'
  private eliminarAntecedentesMedico = this.subirAntecedentesMedico
  private objetives = 'v1/objetives/'
  private cancels = 'v1/cancels'
  private prescripcionsRecemed = 'v1/prescriptions/create-prescription'

  public appointmentStatus = {
    RESERVED: 'reserved',
    APPOINTED: 'appointed',
    RESCHEDULED: 'rescheduled',
    ACTIVE: 'active',
    WAITING_IN_ROOM: 'waitingInRoom',
    IMMEDIATE_CREATED: 'created',
    WAITING_IN_LIST: 'waitingInList',
    PROCESS: 'process',
    RUNNING: 'running',
    PENDING: 'pending',
    FINISHED: 'finished',
    CANCELED: 'canceled',
  };

  constructor(
    private http: HttpClient, 
    private patientService: PatientsService, 
    private appointmentsEvents: AppointmentEventsService,
    private professionalService: ProfessionalService
    ) { }

  paramsId(id) {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return params;
  }

  //getAppointments
  getAppointments(number, status?, context?): Observable<any> {
    if (context) {
      const params = new HttpParams().set('page', number).set('status', status).set('context', context);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params });
    }
    if (status) {
      const params = new HttpParams().set('page', number).set('status', status);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params });
    } else {
      let params = new HttpParams();
      params = params.append('page', number);
      return this.http.get<any>(environment.baseUrl + this.appointments + `/`, { params: params });
    }

  }

  getAllAppointments(number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', number);
    return this.http.get<any>(environment.baseUrl + this.appointments + `/all/`, { params: params });
  }

  getAllAppointmentsWaitinRooms(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + `/immediate/`);
  }

  getTotalPages(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + `/pages`);
  }

  // getAppointments
  getAppointments2(id): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/' + id);
  }

  // getAppointmentsDetails
  getAppointmentsDetails(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/details/', { params: params });
  }

  // getAppointmentsDetails
  getAppointmentsTimeline(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/timeline');
  }

  // getAppointmentsDetails
  getAppointmentsTimelineUser(iduser): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.appointments + '/timeline?userId=' + iduser);
  }

  // getAppointmentsDetails
  getAppointmentsTimelineMilestone(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/milestone-timeline', { params: params });
  }

  // getDoctors
  getDoctors(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('token'))//,
        // 'Content-Type': 'application/json'
      }),
    };
    return this.http.get<any>(environment.baseUrl + this.doctors, httpOptions);
  }

  // get getAppointmentsSession
  getAppointmentsSession(id): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.session, { id: id });
  }

  //reservar cita
  postReserve(reserve): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.reserve, reserve);
  }

  //reservar cita
  postReserveCustomPatient(reserve): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.coordinators + '/appointment/reserve', reserve);
  }

  //consolidate appointments
  postConsolidate(consolidate): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.appointments + this.consolidate, consolidate);
  }

  //get Appointment professional data
  getAppointmentsProfessionalData(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/professional/', { params: params });
  }

  //reagendar 
  postReschedule(id, object): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.post<any>(environment.baseUrl + this.appointments + '/reschedule', object, { params: params });
  }

  //reagendar 
  postCancelarAppointment(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.post<any>(environment.baseUrl + this.cancel, {}, { params: params });
  }

  //events
  postRunAppointment(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.appointments + '/reschedule', { params: params });
  }

  //events
  getPaymentStatus(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.pagoStatus, { params: params });
  }

  //postRunAppointment(id): Observable<any> {
  postEventAppointment(id, event): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.post<any>(environment.baseUrl + this.appointments + '/' + event, '', { params: params });
  }

  //postRunAppointment(id): Observable<any> {
  putAppointment(id, appointmentDetails): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.put<any>(environment.baseUrl + this.appointments, appointmentDetails, { params: params });
  }

  
  //put ges notification/
  /**/ 
    putGesEno(id, gesEno): Observable<any> {
      let params = new HttpParams();
      params = params.append('appointmentId', id);
      return this.http.put<any>(environment.baseUrl + 'v1/appointments/add-notificable-desease/', gesEno, { params: params });
    }

  //subir antecedentes
  postAntecedentes(appointmentId, antecente, object): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', appointmentId);
    return this.http.post<any>(
      environment.baseUrl + this.subirAntecedentesMedico + antecente + '/', { value: object }, { params: params }
    );
  }

  //subir antecedentes
  getAntecedentByProfessional(appointmentId): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', appointmentId);
    return this.http.get<any>(
      environment.baseUrl + this.subirAntecedentesMedico + 'professional' + '/', { params: params });
  }

  //subir antecedentes
  addAntecedentByProfessional(appointmentId, antecente, object): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', appointmentId);
    return this.http.post<any>(
      environment.baseUrl + this.subirAntecedentesMedico + 'professional' + '/' + antecente + '/',
      { value: object },
      { params: params }
    );
  }


  //subir antecedentes
  deleteAntecedentes(appointmentId, antecente, idAntecedente): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', appointmentId);
    return this.http.delete<any>(
      environment.baseUrl + this.eliminarAntecedentesMedico + antecente + '/' + idAntecedente + '/', { params: params }
    );
  }

  //subir antecedentes
  deleteAntecedentesByProfessional(appointmentId, antecente, idAntecedente): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', appointmentId);
    return this.http.delete<any>(
      environment.baseUrl + this.eliminarAntecedentesMedico + 'professional' + '/' + antecente + '/' + idAntecedente + '/', { params: params }
    );
  }

  //Appointment Inmediate
  getAppointmentInmediateState(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.inmediateAppointment);
  }

  AppointmentInmediate(): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.inmediate, {});
  }

  postImmediateConsolidate(object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.immediateConsolidate, object);
  }

  getPaymentStatusAppointmentInmediate(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.get<any>(environment.baseUrl + this.pagoStatusInmediate, { params: params });
  }

  getWaitingRooms(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.waitingForRooms);
  }

  getWaitingAppointmentForRoomsId(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('waitingRoomId', id);
    return this.http.get<any>(environment.baseUrl + this.waitingAppointmentsForRooms, { params: params });
  }

  attendAppointmentInmediate(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    return this.http.post<any>(environment.baseUrl + this.appointmentInmediate, '', { params: params });
  }

  getSibrareUrl(id, type): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    params = params.append('documentType', type);
    return this.http.get<any>(environment.baseUrl + this.getSibrare, { params: params });
  }

  getSibrareStatus(id, documentId): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    params = params.append('documentId', documentId);
    return this.http.get<any>(environment.baseUrl + this.sibrareStatus, { params: params });
  }

  getVerifiedSibrareDocuments(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    //params = params.append('documentId', documentId);
    return this.http.get<any>(environment.baseUrl + this.sibrareStatusVerifiedSibrareDocuments, { params: params });
  }

  getSibrareDocumentUrl(id, documentId): Observable<any> {
    let params = new HttpParams();
    params = params.append('appointmentId', id);
    params = params.append('documentId', documentId);
    return this.http.get<any>(environment.baseUrl + this.sibrareDocumentUrl, { params: params });
  }

  //?appointmentId=5f67ea72a5dbb11acdf34709&documentType=prescription

  postBlocks(date, specialtyId?, professionalId?): Observable<any> {
    if (specialtyId) {
      console.log(date, { specialtyId: specialtyId });
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
        specialtyId: specialtyId,
        professionalId: professionalId,
      });
    } else {
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
      });
    }
  }

  postBlocksProfessionalId(date, professionalId?): Observable<any> {
    if (professionalId) {
      console.log(date, { professionalId: professionalId });
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
        professionalId: professionalId,
      });
    } else {
      return this.http.post<any>(environment.baseUrl + this.blocks, {
        date,
      });
    }
  }

  getObjetives(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.objetives);
  }

  reScheduleAppointment(date, hour, SpecialtiesId, professionalId, appointmentId, objetive): Observable<any> {

    console.log(date, hour, SpecialtiesId, professionalId, appointmentId, objetive)
    
     let object = {
       appointmentDetails: {
         objetive: objetive
       },
       professionalDetails: {
         specialtyId: SpecialtiesId,
         userId: professionalId
       },
       dateDetails: {
         date:{
           day: date.day,
           month: date.month,
           year: date.year
         },
         start: hour
      }
     }
     
     return this.postReschedule(appointmentId, object)
  }

  search(patientControl, method){
    return patientControl?.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        if (typeof val === 'string' && val)
          switch (method) {
            case 'patients':
              return this.searchPatients(val || '')
              break;
      
              case 'professionals':
                return this.searchProfessionals(val || '')
                break;
  
            default:
              break;
          }
      })
    )
  }

  searchPatients(query): Observable<any[]> {
    return this.patientService.search(query)
      .pipe(
        map(res => this.createDisplayForSelect(res.payload))
      )
  }

  searchProfessionals(query): Observable<any[]>{
    return this.professionalService.search(query)
    .pipe(
      map(res => this.createDisplayForSelect(res.payload))
    )
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
  
  cancelReasons(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + this.cancels);
  }

  createPrescriptionRecemed(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this.prescripcionsRecemed,  data);
  }

}

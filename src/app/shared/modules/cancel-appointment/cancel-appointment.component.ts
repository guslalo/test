import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { PatientsService } from 'src/app/services/patients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentEventsService } from '../../../services/appointment-events.service'
import { ModalConfig } from './cancel.interface'
declare var $:any;

@Component({
  selector: 'modal-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class CancelAppointmentComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<CancelAppointmentComponent>

  private modalRef: NgbModalRef
  public appointmentForm: FormGroup;
  public cancels: any;
  public cancelsSelect: any;
  public _pre = []
  public _post = []
  public appointment: any;

  constructor(
    private modalService: NgbModal,
    private appointmentsService: AppointmentsService,
    private patientService: PatientsService,
    private specialtiesService: SpecialtiesService,
    private professionalService: ProfessionalService,
    private formBuilder: FormBuilder,
    private appointmentsEvents: AppointmentEventsService
  ) { }

  ngOnInit(): void {
  

   

    
    console.log('modal cancel appointment')
    let _user = JSON.parse(localStorage.getItem('currentUser'))

    this.modalConfig = {
      title: 'dashboard.home.uncategorized.cancelService.label',
      profile: _user.role
    }

    this.makeForm()
    this.buildStatuses()
    this.getCancelReasons()
    
    this.appointmentsEvents
    .setAppointmentCancelReasons$
    .subscribe((appointment) => {
      console.log('setAppointmentCancelReasons', appointment)
      this.appointment = appointment
      this.buildSelectCancels(appointment.administrativeDetails.status)
    })


  }

  getCancelReasons(){
    this.appointmentsService
    .cancelReasons()
    .subscribe((data) => {
      this.cancels = data
    })
  }

  buildSelectCancels(needle){
    let _builderIndex
    let _indexPre = this._pre.indexOf(needle)
    let _indexPost = this._post.indexOf(needle)

    if(_indexPre >=0) _builderIndex = 'pre'
    if(_indexPost >=0) _builderIndex = 'post'

    this.cancelsSelect = this.cancels.filter((e) => {
      return e.type.includes(_builderIndex)
    })
  }

  buildStatuses(){
    let _c = 0
    for (const key in this.appointmentsService.appointmentStatus) {
      if (Object.prototype.hasOwnProperty.call(this.appointmentsService.appointmentStatus, key)) {
        const element = this.appointmentsService.appointmentStatus[key];
        if(_c <= 2){
          this._pre.push(element)
        }else{
          this._post.push(element)
        }
        _c++
      }
    }
  }

  makeForm(){
    this.appointmentForm = this.formBuilder.group({
      cancel: [null, Validators.required],
    });
  }

  cancelAppointment(){
   
    let appointmentObject = {
      administrativeDetails: {
        cancellationReason: this.appointmentForm.getRawValue().cancel,
        status: 'canceled'
      }
    };

    this.appointmentsService.putAppointment(this.appointment._id, appointmentObject).subscribe(
      (data) => {
        this.appointmentsEvents.listAppointments$.emit()
        this.appointmentForm.get('cancel').setValue('null');
      },
      (error) => {
        console.log(error);
      }
    );

  }

}

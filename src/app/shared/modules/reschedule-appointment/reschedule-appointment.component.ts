import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { CustomDateAdapter } from '../../utils';
import { ModalConfig } from './modal.interface';

@Component({
  selector: 'modal-reagendamiento',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.scss']
})
export class RescheduleAppointmentComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<RescheduleAppointmentComponent>
  private modalRef: NgbModalRef

  public appointmentForm: FormGroup;
  public objetives: any;
  public blocks: any[];
  public _currentUser: any;

  public moment: any = moment;
  public appoinmentDate: NgbDateStruct;
  public dateAdapter = new CustomDateAdapter();

  public minDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  public currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  public appointment: any;
  public patients: any;
  public patientSelected: any;
  public filteredPatients: Observable<any>;
  public filteredProfessionals: Observable<any>;
  public professionals: any;
  public professionalId: any;
  public specialtyId: any;
  public hidePatientProfessional: any;

  constructor(
    private appointmentsService: AppointmentsService,
    private appointmentEvents: AppointmentEventsService,
    private formBuilder: FormBuilder,
    private professionalService: ProfessionalService,
  ) { }

  ngOnInit(): void {
    console.log('modal re agendamiento', this.modalConfig)
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'))

    this.professionalId = this._currentUser.id // id del medico logueado
    
    this.appointmentEvents.setAppointmentReagendamiento$.subscribe(
      (data) => {
        this.appointment = data

        console.log('setAppointmentReagendamiento event', data, Array.isArray(this.appointment.professionalDetails.specialtyDetails))

        // this.hidePatientProfessional = true

        if(this.appointment.professionalDetails.specialtyId){
          this.specialtyId = this.appointment.professionalDetails.specialtyId
        }else{
          this.specialtyId = this.appointment.professionalDetails.specialtyDetails[0].specialtyId
        }

        // perfil coordinador
        if(Array.isArray(this.appointment.professionalDetails.specialtyDetails)){
          this.appointmentForm.controls['patient'].disable()

          // specialidad publicada en la cita medica
          this.specialtyId = this.appointment.professionalDetails.specialtyDetails[0].specialtyId
          this.professionalService.findBySpecialtyId(this.appointment.professionalDetails.specialtyDetails[0].specialtyId)
          .subscribe((data) => {
            console.log('find specialists', data)
            this.professionals = data.payload
          })
        }
      }
    )

    this.appointmentEvents.getProfessionalBlocks$.subscribe(
      () => {
        this.getBlocks()
      }
    )

    this.modalConfig = {
      title: 'clinicalFile.reSheduleService.label',
      profile: this._currentUser.role
    }

    this.getObjetives()
    this.makeForm()

    this.filteredPatients = this.appointmentsService.search(this.appointmentForm.controls['patient'], 'patients')
    this.filteredProfessionals = this.appointmentsService.search(this.appointmentForm.controls['professional'], 'professionals')
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    return user ? user.name : user;
  }

  getProfessionalBlocks(item){
    let _id = item.id ? item.id : item
    this.professionalId = _id // id del medico seleccionado como coordinador

    console.log(this.specialtyId, item)

    this.getBlocks()
  }

  setPatient(patient) {
    this.patientSelected = patient.id;
  }

  reagendar() {
    let _date = this.appointmentForm.getRawValue().date
    let _time = this.appointmentForm.getRawValue().start
    let _objetiveId = this.appointmentForm.getRawValue().objective

    let objetive = this.objetives.filter((e) => {
      return e._id.includes(_objetiveId)
    })[0].name

    this.appointmentsService
    .reScheduleAppointment(
      _date,
      _time,
      this.specialtyId, // condicionar
      this.professionalId, // condicionar
      this.appointment._id,
      objetive
    ).subscribe((data) => {
      console.log(data)
      this.appointmentEvents.listAppointments$.emit()
    })
  }

  makeForm() {
    this.appointmentForm = this.formBuilder.group({
      date: [null, Validators.required],
      start: [null, Validators.required],
      objective: ['', Validators.required],

      professional: ['', Validators.required],
      patient: ['', Validators.required],
    });
  }

  getObjetives() {
    this.appointmentsService.getObjetives().subscribe((data) => {
      this.objetives = data
    })
  }

  getBlocks() {
    let date = this.appointmentForm.controls.date.value;
    let specialtyId = this.specialtyId
    let professionalId = this.professionalId
    this.blocks = [];

    console.log(        date,
      specialtyId,
      professionalId
)

    this.appointmentsService
      .postBlocks(
        date,
        specialtyId,
        professionalId
      )
      .subscribe(
        (data) => {
          if (data.internalCode === 103) {
            this.blocks = [];
          } else {
            if (data.payload.length) {
              this.blocks = data.payload[0]?.blocks;
            } else {
              this.blocks = data.payload;
            }
            localStorage.removeItem('reserva');
            localStorage.setItem('reserva', JSON.stringify(this.blocks));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

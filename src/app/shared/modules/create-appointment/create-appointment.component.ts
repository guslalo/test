import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { PatientsService } from 'src/app/services/patients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { switchMap, startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppointmentEventsService } from '../../../services/appointment-events.service'

@Component({
  selector: 'modal-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  @ViewChild('modal') private modalContent: TemplateRef<CreateAppointmentComponent>
  private modalRef: NgbModalRef
  appointmentForm: FormGroup;

  public patients = [];
  public patientSelected: string;
  public filteredPatients: Observable<any[]>;
  public filteredProfessionals: Observable<any[]>;
  public objetives; any;
  public moment: any = moment;

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

  public appoinmentDate: NgbDateStruct;
  public dateAdapter = new CustomDateAdapter();
  public blocks: any[];
  public professionalSelected: any;
  public professionals = [];
  public specialties: any;
  tempAppointments: any[];
  appointments: any;
  tempProfessionals: any[];

  constructor(
    private modalService: NgbModal,
    private appointmentsService: AppointmentsService,
    private patientService: PatientsService,
    private specialtiesService: SpecialtiesService,
    private professionalService: ProfessionalService,
    private formBuilder: FormBuilder,
    private translationService: TranslocoService,
    private appointmentsEvents: AppointmentEventsService
  ) { }

  ngOnInit(): void {

    this.getProfessionals()
    this.getObjetives()

    this.appointmentForm = this.formBuilder.group({
      patient: [null, Validators.required],
      date: [null, Validators.required],
      start: [null, Validators.required],
      objective: ['', Validators.required],
      professional: [null, Validators.required],
      specialty: [null, Validators.required],
    });

    this.filteredPatients = this.appointmentForm.controls['patient'].valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        if (typeof val === 'string' && val)
          return this.searchPatients(val || '')
      })
    )

    this.filteredProfessionals = this.appointmentForm.controls['professional'].valueChanges.pipe(startWith(''), map(newVal => {
      return this.professionals.filter(value => {
        return value.personalData.name?.toLowerCase().includes(newVal.toLowerCase()) ||
          value.personalData.secondLastName?.toLowerCase().includes(newVal.toLowerCase()) ||
          (value.personalData.name + ' ' + value.personalData.secondLastName).toLowerCase().includes(newVal.toLowerCase())
      })
    }))

  }

  open() {
    this.modalRef = this.modalService.open(this.modalContent)
    this.modalRef.result.then()
  }

  close() {
    this.modalRef.close()
  }

  dismiss() {
    this.modalRef.dismiss()
  }

  searchPatients(query): Observable<any[]> {
    return this.patientService.search(query)
      .pipe(
        map(response => {
          if (response.payload.length) {
            return response.payload.map(_e => {
              let name

              (_e.identificationData.hasOwnProperty('rg') && _e.identificationData.rg != '') ? name = 'RG - ' + _e.identificationData.rg + ' - ' : name = '';
              (_e.identificationData.hasOwnProperty('cns') && _e.identificationData.cns != '') ? name = 'CNS - ' + _e.identificationData.cns + ' - ' : name = '';
              (_e.identificationData.hasOwnProperty('cpf') && _e.identificationData.cpf != '') ? name = 'CPF - ' + _e.identificationData.cpf + ' - ' : name = '';

              name += _e.personalData.name + ' ' + _e.personalData.secondLastName

              return { id: _e._id, name }
            })
          } else {
            return []
          }
        })
      )
  }

  getObjetives() {
    this.appointmentsService.getObjetives().subscribe((data) => {
      this.objetives = data
    })
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    return user ? user.name : user;
  }

  setPatient(patient) {
    this.patientSelected = patient.id;
  }

  getBlocks() {
    let date = this.appointmentForm.controls.date.value;
    let specialtyId = this.appointmentForm.controls.specialty.value;
    let professionalId = this.professionalSelected
    console.log(date, specialtyId);
    this.blocks = [];

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

  getProfessionals() {
    this.professionalService.getProfessionals().subscribe(
      (data) => {
        this.tempProfessionals = [...data];
        this.professionals = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSpecialties(professional) {
    this.professionalSelected = professional.userData[0]._id;
    let userId = professional.userData[0]._id;

    this.specialtiesService.getSpecialtiesForProfessional(userId).subscribe(
      (data) => {
        this.specialties = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointments() {
    this.appointmentsService.getAllAppointments(1).subscribe(
      (data) => {
        this.tempAppointments = [...data.payload];
        this.appointments = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createAppointment() {
    const reserve = {
      patientDetails: {
        userId: this.patientSelected,
      },
      professionalDetails: {
        userId: this.professionalSelected,
        specialtyId: this.appointmentForm.controls.specialty.value,
        specialtyDetails: {
          price: null,
        },
      },
      professionalId: this.professionalSelected,
      dateDetails: {
        date: this.appointmentForm.controls.date.value,
        start: this.appointmentForm.controls.start.value,
      },
    };

    this.appointmentsService.postReserveCustomPatient(reserve).subscribe(
      (data) => {
        this.appointmentsEvents.updateAppointments()
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

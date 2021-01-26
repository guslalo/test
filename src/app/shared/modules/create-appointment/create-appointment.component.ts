import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { PatientsService } from 'src/app/services/patients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { ProfessionalService } from 'src/app/services/professional.service';
import { Observable } from 'rxjs';
import { switchMap, startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppointmentEventsService } from '../../../services/appointment-events.service'
import { ModalConfig } from './modal.interface'

/** 
 *  para implementar poner este callback en el componente a integrar
 *   ngAfterViewInit() {
    let _user = JSON.parse(localStorage.getItem('currentUser'))
    this.appointmentsEvents.buildForm$.emit(_user.role)
    this.appointmentsEvents.getProfessionals$.emit()
    this.appointmentsEvents.getMedicalSpecialties$.emit()
  }
*/

@Component({
  selector: 'modal-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<CreateAppointmentComponent>
  private modalRef: NgbModalRef
  public appointmentForm: FormGroup;

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
  public tempAppointments: any[];
  public appointments: any;
  public tempProfessionals: any[];
  public medicalSpecialties: any;
  public selectedProfessionals: string;
  public buildModal: boolean = false;

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
    console.log('INIT MODAL')
    let _user = JSON.parse(localStorage.getItem('currentUser'))

    this.modalConfig = {
      // title: 'clinicalFile.reSheduleService.label'
      title: 'clinicalFile.reserveService.label',
      profile: _user.role // coordinator, admin, professional
    }

    this.getObjetives()

    this.appointmentsEvents.filterProfessionalsByType$.subscribe(
      (data) => {
        this.selectedProfessionals = this.appointmentsService.createDisplayForSelect(data, 'other', '')
      }
    )

    this.appointmentsEvents.getSpecialtiesForProfessional$.subscribe(
      (data) => {
        this.getSpecialties(data)
      }
    )

    this.appointmentsEvents.getProfessionals$.subscribe(
      (data) => {
        this.getProfessionals()
      }
    )

    this.appointmentsEvents.getMedicalSpecialties$.subscribe(
      (data) => {
        this.getMedicalSpecialties()
      }
    )

  }

  ngAfterContentInit() {
    this.appointmentsEvents.buildForm$.subscribe(
      (data) => {

        this.buildModal = true

        switch (data) {
          case 'professional':
            this.appointmentForm = this.formBuilder.group({
              patient: [null, Validators.required],
              date: [null, Validators.required],
              start: [null, Validators.required],
              objective: ['', Validators.required],
              specialty: [null, Validators.required],
            });
            break;

          default:
            this.appointmentForm = this.formBuilder.group({
              patient: [null, Validators.required],
              date: [null, Validators.required],
              start: [null, Validators.required],
              objective: ['', Validators.required],
              professional: [null, Validators.required],
              specialty: [null, Validators.required],
              profesional_type: [null, Validators.required],
            });
            break;
        }

        this.filteredPatients = this.appointmentsService.search(this.appointmentForm?.controls['patient'], 'patients')
      }
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
    console.log(patient)
    this.patientSelected = patient.id;
  }

  getBlocks() {
    let date = this.appointmentForm.controls.date.value;
    let specialtyId = this.appointmentForm.controls.specialty.value;
    let professionalId = this.professionalSelected
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

  getSpecialties(userId) {
    this.professionalSelected = userId

    this.specialtiesService.getSpecialtiesForProfessional(userId).subscribe(
      (data) => {
        this.specialties = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMedicalSpecialties() {
    this.specialtiesService.getMedicalSpecialties().subscribe(
      (data) => {
        this.medicalSpecialties = data.payload
      }
    )
  }

  selectProfessionalType(item) {
    this.professionalService.getProfessionalsBySpecialtyId(item).subscribe(
      (data) => {
        this.appointmentsEvents.filterProfessionalsByType(data)
      }
    )
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
    let reserva = {
      appointmentType: 'agendamiento',
      patientDetails: {
        userId: this.patientSelected,
      },
      professionalDetails: {
        userId: this.professionalSelected,
        specialtyDetails: {
          price: 0,
        },
        specialtyId: this.appointmentForm.controls.specialty.value,
      },
      professionalId: this.professionalSelected,
      dateDetails: {
        date: this.appointmentForm.controls.date.value,
        start: this.appointmentForm.controls.start.value,
      },
    };

    this.appointmentsService.reserveAppointment(reserva)
    .then(this.appointmentsService.consolidateHandler)
    .then(this.appointmentsService.consolidateAppointment)
    .then((data) => {
      console.log(data)
      this.appointmentsEvents.updateAppointments()
    })
    .catch((err) => {
      console.log(err)
    })

  }
}

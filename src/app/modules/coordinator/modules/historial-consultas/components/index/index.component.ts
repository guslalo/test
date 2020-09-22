import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from 'src/app/services/appointments.service';
import * as moment from 'moment';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { PatientsService } from 'src/app/services/patients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public appointments: any;
  model2: NgbDateStruct;
  public timeline: any;
  public fecha: any;
  public photoUrlBase = 'https://itms-dev.s3-sa-east-1.amazonaws.com/';

  public patients = [];
  public tempPatients = [];
  public professionals = [];
  public tempProfessionals = [];
  public blocks = [];
  public specialties = [];

  moment: any = moment;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  // FILTERS
  tempAppointments: any[] = [];
  searchTerm: string = '';
  appointmentStatusSelected: any = null;
  appointmentDateSelected: NgbDateStruct;
  professionalSelected: string;
  patientSelected: string;
  selected = [];

  minDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  appoinmentDate: NgbDateStruct;
  dateAdapter = new CustomDateAdapter();

  appointmentForm: FormGroup;

  // @ViewChild('newAppointment') openModal: ElementRef;

  constructor(
    private appointmentsService: AppointmentsService,
    private patientService: PatientsService,
    private specialtiesService: SpecialtiesService,
    private professionalService: ProfessionalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAppointments();
    this.getPatients();
    this.getProfessionals();
    // this.openModal.nativeElement.click();

    this.appointmentForm = this.formBuilder.group({
      patient: [null, Validators.required],
      date: [null, Validators.required],
      start: [null, Validators.required],
      objective: ['', Validators.required],
      professional: [null, Validators.required],
      specialty: [null, Validators.required],
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    //access component "this" here
    return user ? user.personalData.name + ' ' + user.personalData.lastName : user;
  }

  getPatients() {
    this.patientService.getAllPatients().subscribe(
      (data) => {
        console.log(data);
        this.tempPatients = [...data];
        this.patients = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProfessionals() {
    this.professionalService.getProfessionals().subscribe(
      (data) => {
        console.log(data);
        this.tempProfessionals = [...data];
        this.professionals = data;
        // console.log(this.professionals);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBlocks() {
    let date = this.appointmentForm.controls.date.value;
    let specialtyId = this.appointmentForm.controls.specialty.value;
    console.log(date, specialtyId);
    this.blocks = [];

    this.appointmentsService
      .postBlocks(
        date,
        specialtyId //
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
            console.log(data.payload);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setPatient(patient) {
    console.log(patient);
    this.patientSelected = patient.userId;
  }

  getSpecialties(professional) {
    this.professionalSelected = professional.userData[0]._id;
    let userId = professional.userData[0]._id;
    console.log(userId);

    this.specialtiesService.getSpecialtiesForProfessional(userId).subscribe(
      (data) => {
        console.log(data);
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
        console.log(this.appointments);
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

    //.reserve.dateDetails.date = object;
    console.log(reserve);

    this.appointmentsService.postReserveCustomPatient(reserve).subscribe(
      (data) => {
        this.getAppointments();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFiltersAppointments() {
    const searchTerm = this.searchTerm.toLowerCase();

    const temp = this.tempAppointments
      // SEARCH FILTER
      .filter((item) => {
        return (
          (item.patientDetails.userDetails[0].identificationData.cpf?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.userDetails[0].identificationData.cns?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.userDetails[0].identificationData.rgRegistry?.toLowerCase().indexOf(searchTerm) ||
            item.patientDetails.userDetails[0].identificationData.passport?.toLowerCase().indexOf(searchTerm)) !== -1 ||
          item.patientDetails.userDetails[0]?.personalData.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          item.professionalDetails.userDetails[0]?.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          moment(item.dateDetails.date).format('DD/MM/YYYY').toLowerCase().indexOf(searchTerm) !== -1 ||
          item.dateDetails.start.toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      })
      // STATUS APPOINTMENT FILTER
      .filter((item) => {
        if (this.appointmentStatusSelected) {
          if (item.administrativeDetails.status === this.appointmentStatusSelected) {
            return item;
          }
        } else {
          return item;
        }
      })
      // DATE APPOINTMENT FILTER
      .filter((item) => {
        if (this.appointmentDateSelected) {
          const date = this.dateAdapter.toModel(this.appointmentDateSelected);
          console.log(date, item.dateDetails.date);
          if (moment(item.dateDetails.date).format('YYYY/MM/DD') === date) {
            return item;
          }
        } else {
          return item;
        }
      });

    this.appointments = temp;
    // console.log(temp);
  }

  exportAsExcelFile() {
    // FORMAT DATA
    const xlsx_users = this.selected.map((item) => ({
      ID:
        item.patientDetails.userDetails[0]?.identificationData.cpf ||
        item.patientDetails.userDetails[0]?.identificationData.cns ||
        item.patientDetails.userDetails[0]?.identificationData.rgRegistry ||
        item.patientDetails.userDetails[0]?.identificationData.passport,
      Nombre:
        item.patientDetails.userDetails[0]?.personalData.name +
          ' ' +
          item.patientDetails.userDetails[0]?.personalData.secondLastName ||
        item.patientDetails.userDetails[0]?.personalData.lastName,
      Fecha: moment(item.dateDetails.date).format('DD/MM/YYYY'),
      Hora: item.dateDetails.start + ' hrs',
      Sala: 'S/R',
      Profesional:
        item.professionalDetails.userDetails[0]?.name + ' ' + item.professionalDetails.userDetails[0]?.lastName,
      Estado:
        item.administrativeDetails.status === 'reserved'
          ? 'Reservada'
          : item.administrativeDetails.status === 'appointed'
          ? 'Agendada'
          : item.administrativeDetails.status === 'rescheduled'
          ? 'Re-Agendada'
          : item.administrativeDetails.status === 'active'
          ? 'Activa'
          : item.administrativeDetails.status === 'waitingInRoom'
          ? 'En Sala de Espera'
          : item.administrativeDetails.status === 'waitingInList'
          ? 'En Lista de Espera'
          : item.administrativeDetails.status === 'running'
          ? 'En Curso'
          : item.administrativeDetails.status === 'pending'
          ? 'Pendiente'
          : item.administrativeDetails.status === 'finished'
          ? 'Finalizada'
          : item.administrativeDetails.status === 'canceled'
          ? 'Cancelada'
          : null,
    }));
    const workBook = XLSX.utils.book_new();
    workBook.SheetNames.push('export_1');
    const workSheet = XLSX.utils.json_to_sheet(xlsx_users);
    // SET COLUMNS SIZE
    var wscols = [{ wch: 10 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 10 }];
    workSheet['!cols'] = wscols;
    workBook.Sheets['export_1'] = workSheet;
    // CREATE AND DOWNLOAD DOCUMENT
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
    XLSX.writeFile(workBook, 'consultas_planilla.xlsx');
  }
}

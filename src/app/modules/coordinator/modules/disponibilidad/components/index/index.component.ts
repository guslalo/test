import { Component, OnInit } from '@angular/core';
import { Subject, forkJoin, of } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
//import { NgbdTimepickerBasic } from './timepicker-basic';

//services
import { CoordinatorService } from './../../../../../../services/coordinator.service';
import { AvailabilityService } from './../../../../../../services/availability.service';
import { ProfessionalService } from './../../../../../../services/professional.service';
import { SpecialtiesService } from './../../../../../../services/specialties.service';

import * as moment from 'moment';

import { NgbDateStruct, NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from 'src/app/shared/utils';
const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public datePipeString: string;
  dateAdapter = new CustomDateAdapter();

  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10),
    };
  }
  time: '13:30:00';

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}` : null;
  }

  model2: NgbDateStruct;
  model3: NgbDateStruct;
  endDate: NgbDateStruct;
  startDate: NgbDateStruct;

  constructor(
    private availabilityService: AvailabilityService,
    private coordinatorService: CoordinatorService,
    private _formBuilder: FormBuilder,
    private professionalService: ProfessionalService,
    private specialtiesService: SpecialtiesService
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    this.minDateTermino = {
      year: this.minDate.year,
      month: this.minDate.month,
      day: this.minDate.day,
    };
  }

  get dailyRanges() {
    return this.createAvailability.get('dailyRanges') as FormArray;
  }
  public menu = [];

  options: any;
  calendar: boolean;
  public disponibilidad: any;
  public disponibilidadObject = {};
  public disponibilidadArray = [];
  public especialidad: any;
  public diasBloqueados: any;
  public createAvailability: FormGroup;
  public availabilityDays: FormGroup;
  public dailyRangeFormGroup: FormGroup;
  public availabilityBlocked: FormGroup;
  idAvailability: any;
  public specialties: string;
  public specialtiesId: string;
  public medicalSpecialties: any;
  public state: any;

  public professionals = [];
  public tempProfessionals = [];

  medicalSpecialty: string;
  specialtyMap = [];
  professionalSelected: string;
  specialtySelected: string;

  timeUpdated = new Subject<string>();

  date: { year: string; month: string };
  //time = { hour: 13, minute: 30 };

  days: Array<any> = [
    { id: 1, checked: false, name: 'Lun', value: 'lunes' },
    { id: 2, checked: false, name: 'Mar', value: 'martes' },
    { id: 3, checked: false, name: 'Mie', value: 'miercoles' },
    { id: 4, checked: false, name: 'Jue', value: 'jueves' },
    { id: 5, checked: false, name: 'Vie', value: 'viernes' },
    { id: 6, checked: false, name: 'Sab', value: 'sabado' },
    { id: 7, checked: false, name: 'Dom', value: 'domingo' },
  ];
  daysSelected: Array<any> = [];

  days2: Array<any> = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  interval: Array<any> = [
    { min: '5', value: 5 },
    { min: '10', value: 10 },
    { min: '15', value: 15 },
    { min: '20', value: 20 },
    { min: '25', value: 25 },
    { min: '30', value: 30 },
    { min: '35', value: 35 },
    { min: '40', value: 40 },
    { min: '45', value: 45 },
    { min: '50', value: 50 },
    { min: '55', value: 55 },
    { min: '60', value: 60 },
  ];

  minDate = undefined;
  minDateTermino = undefined;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
  };
  showActiveDays: Boolean = false;
  showBlockedDays: Boolean = false;

  onCheckboxChange(e) {
    const dailyDetails: FormArray = this.createAvailability.get('dailyDetails') as FormArray;

    if (e.target.checked) {
      dailyDetails.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      dailyDetails.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          dailyDetails.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  initCalendar() {
    setTimeout(() => {
      this.calendar = true;
    }, 260);
  }

  ngOnInit(): void {
    this.getProfessionals();
    this.getProfessionalSpecialties();
    this.getAvailability();

    this.createAvailability = this._formBuilder.group({
      professional: [null, Validators.required],
      specialty: [null, [Validators.required]],
      specialtyName: new FormControl(),
      objective: [null, [Validators.required]], //[Validators.required],
      appointmentDuration: [5, null],
      endDate: [null, [Validators.required]], // [Validators.required]
      startDate: [null], //new FormControl()
      dailyDetails: this._formBuilder.array([]), //[Validators.required]
      dailyRanges: this._formBuilder.array([]),
    });

    this.availabilityBlocked = this._formBuilder.group({
      allDay: [null],
      dateBlock: [null, [Validators.required]],
      startBlock: [null],
      endBlock: [null],
    });

    this.agregardailyRanges();
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    //access component "this" here
    return user ? user.personalData.name + ' ' + user.personalData.lastName : user;
  }

  // controls reactivos
  agregardailyRanges() {
    this.dailyRangeFormGroup = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });

    this.dailyRanges.push(this.dailyRangeFormGroup);
  }

  removerDailyRanges(indice: number) {
    this.dailyRanges.removeAt(indice);
  }

  getAvailability() {
    this.disponibilidadArray = [];
    this.coordinatorService.getAvailability().subscribe(
      (data) => {
        console.log(data.payload);
        let availabilities = data.payload.filter((item) => !item.isDeleted);
        console.log(availabilities);

        for (let item of availabilities) {
          this.especialidad = this.specialtiesService.getSpecialtiesId(item.professionalDetails.specialtyId).subscribe(
            (specialty) => {
              this.especialidad = specialty.payload.specialtyName;
              this.disponibilidadObject = {
                _id: item._id,
                daysDetails: item.dateDetails.days,
                dateStart: item.dateDetails.startDate,
                dateEnd: item.dateDetails.endDate,
                start: item.dateDetails.dailyRanges,
                objective: item.administrativeDetails.objective,
                specialty: this.especialidad,
                professional: `${item.professionalName[0].personalData.name} ${item.professionalName[0].personalData.lastName}`,
                status: item.administrativeDetails.isActive,
              };
              this.disponibilidadArray.push(this.disponibilidadObject);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //GET mi especialidad
  getProfessionalSpecialties() {
    this.professionalService.getProfessionalSpecialties().subscribe(
      (data) => {
        this.medicalSpecialties = data.payload;
        console.log(this.medicalSpecialties);
        console.log(this.medicalSpecialties[0]._id);
        this.specialtyMap = data.payload.reduce((obj, item) => {
          obj[item._id] = item;
          return obj;
        }, {});
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //get lista de dias bloqueados
  getAvailabilityBlocked() {
    this.availabilityService.getAvailabilityBlocked().subscribe(
      (data) => {
        this.diasBloqueados = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crearAvailability() {
    console.log(this.createAvailability.controls.specialty);

    const formObject = {
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: parseInt(this.createAvailability.controls.appointmentDuration.value),
      },
      professionalDetails: {
        userId: this.createAvailability.controls.professional.value.userData[0]._id,
        specialtyId: this.createAvailability.controls.specialty.value,
      },
      dateDetails: {
        startDate: this.createAvailability.controls.startDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRanges: [
          {
            start: this.toModel(this.createAvailability.controls.dailyRanges.value[0].start),
            end: this.toModel(this.createAvailability.controls.dailyRanges.value[0].end),
          },
        ],
      },
    };
    console.log(formObject);

    if (formObject) {
      this.availabilityService
        .postAvailabilityCoordinator(
          formObject.administrativeDetails,
          formObject.professionalDetails,
          formObject.dateDetails
        )
        .subscribe(
          (data) => {
            this.createAvailability.reset();
            console.log('disponibilidad creada', data);
            this.getAvailability();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  putState(item) {
    console.log(item);
    this.availabilityService.updateStateCoordinator(item._id, item.status ? false : true).subscribe(
      (data) => {
        console.log(data);
        this.state = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public allDayBoolean = false;
  allDayBooleanState() {
    this.allDayBoolean = !this.allDayBoolean;
  }

  actualizarAvailability(id) {
    //this.createAvailability = id;
    let _days = this.daysSelected
      .filter((item) => {
        if (item.checked) return item;
      })
      .map((item) => item.value);
    console.log(id);
    console.log(this.createAvailability);
    const formObject = {
      id,
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: parseInt(this.createAvailability.controls.appointmentDuration.value),
      },
      professionalDetails: {
        specialtyId: this.createAvailability.controls.specialty.value,
      },
      dateDetails: {
        startDate: this.createAvailability.controls.startDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: _days,
        dailyRanges: [
          {
            start: this.toModel(this.createAvailability.controls.dailyRanges.value[0].start),
            end: this.toModel(this.createAvailability.controls.dailyRanges.value[0].end),
          },
        ],
      },
    };
    console.log(formObject);
    console.log(formObject.dateDetails.endDate);

    if (formObject) {
      this.availabilityService
        .putAvailabilityCoordinator(
          formObject.id,
          formObject.administrativeDetails,
          formObject.professionalDetails,
          formObject.dateDetails
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.getAvailability();
          },
          (error) => {
            console.log(error);
          }
        );
    } /**/
  }

  putAvailability(id) {
    //this.idAvailability = id;
    //console.log(this.idAvailability)
    this.availabilityService.getAvailabilityCoordinator(id).subscribe(
      (data) => {
        this.idAvailability = data.payload[0];
        console.log(this.idAvailability);
        this.createAvailability.get('professional').setValue(this.idAvailability.professionalDetails.professional[0]);
        this.professionalSelected = this.idAvailability.professionalDetails.userId;
        this.escogerProfessional(this.createAvailability.controls.professional.value);

        this.createAvailability.get('objective').setValue(this.idAvailability.administrativeDetails.objective);
        this.createAvailability
          .get('specialty')
          .setValue(this.idAvailability.professionalDetails.specialtyDetails[0].specialtyId);

        var daysSeletected = [];

        for (const day of this.idAvailability.dateDetails.days) {
          let formatDay = day.charAt(0).toUpperCase() + day.slice(1);
          daysSeletected.push({
            checked: true,
            name: formatDay.substring(0, 3),
            value: day,
          });
        }

        let filteredDays = this.days.filter((d, index) => {
          // console.log(d, index);
          if (daysSeletected.map((item) => item.value).indexOf(this.days[index].value) === -1) {
            // console.log(true);
            return d;
          }
        });

        this.daysSelected = [...daysSeletected, ...filteredDays].sort((a, b) => {
          return a.id - b.id;
        });

        // console.log(this.daysSelected);

        this.endDate = this.dateAdapter.fromModel(
          moment(this.idAvailability.dateDetails.endDate).add(1, 'days').format('YYYY/MM/DD')
        );
        this.createAvailability.get('endDate').setValue(this.endDate);

        this.startDate = this.dateAdapter.fromModel(
          moment(this.idAvailability.dateDetails.startDate).add(1, 'days').format('YYYY/MM/DD')
        );
        this.createAvailability.get('startDate').setValue(this.startDate);

        this.createAvailability
          .get('appointmentDuration')
          .setValue(this.idAvailability.administrativeDetails.appointmentDuration);

        this.dailyRangeFormGroup.reset();

        console.log(this.fromModel(this.idAvailability.dateDetails.dailyRanges[0].start));

        this.dailyRangeFormGroup
          .get('start')
          .setValue(this.fromModel(this.idAvailability.dateDetails.dailyRanges[0].start));
        this.dailyRangeFormGroup
          .get('end')
          .setValue(this.fromModel(this.idAvailability.dateDetails.dailyRanges[0].end));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get dailyDetails() {
    return this.createAvailability.get('dailyDetails') as FormArray;
  }

  deleteAvailability(id) {
    const formObject = {
      id,
    };
    console.log(formObject);
    this.availabilityService.deleteAvailabilityCoordinator(formObject).subscribe(
      (data) => {
        console.log(data);
        this.getAvailability();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  escogerProfessional(professional) {
    let userId = this.professionalSelected || professional?.userData[0]?._id;
    this.specialtiesService.getSpecialtiesForProfessional(userId).subscribe(
      (data) => {
        this.specialtiesId = data.payload;
        this.medicalSpecialty = data.payload[0].medicalSpecialtyId;
        this.specialtySelected = data.payload[0].specialtyName;
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
}

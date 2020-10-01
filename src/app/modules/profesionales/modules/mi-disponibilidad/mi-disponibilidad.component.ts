import { Component, OnInit } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { DatePipe } from '@angular/common';

//services
import { AvailabilityService } from '../../services/availability.service';
import { ProfessionalService } from './../../../../services/professional.service';
import { SpecialtiesService } from './../../../../services/specialties.service';
import * as moment from 'moment';
import {
  NgbDateStruct,
  NgbDateParserFormatter,
  NgbTimeStruct,
  NgbTimeAdapter,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from 'src/app/shared/utils';
import esLocale from '@fullcalendar/core/locales/es';
import ptLocale from '@fullcalendar/core/locales/pt';
import { TranslocoService } from '@ngneat/transloco';

const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

// carrusel
@Component({
  selector: 'app-mi-disponibilidad',
  templateUrl: './mi-disponibilidad.component.html',
  styleUrls: ['./mi-disponibilidad.component.scss'],
  providers: [DatePipe, { provide: NgbTimeAdapter, useClass: MiDisponibilidadComponent }],
})
export class MiDisponibilidadComponent implements OnInit {
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
  dailyDetailsSelected: FormArray;
  checked: boolean;
  days: any;

  constructor(
    private availabilityService: AvailabilityService,
    private _formBuilder: FormBuilder,
    private professionalService: ProfessionalService,
    private specialtiesService: SpecialtiesService,
    private translocoService: TranslocoService
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

    this.checked = false;

    this.days = [
      { id: 1, checked: false, name: 'common.weekDaysAbbr.mon.label', value: 'lunes' },
      { id: 2, checked: false, name: 'common.weekDaysAbbr.tue.label', value: 'martes' },
      { id: 3, checked: false, name: 'common.weekDaysAbbr.wed.label', value: 'miercoles' },
      { id: 4, checked: false, name: 'common.weekDaysAbbr.thu.label', value: 'jueves' },
      { id: 5, checked: false, name: 'common.weekDaysAbbr.fri.label', value: 'viernes' },
      { id: 6, checked: false, name: 'common.weekDaysAbbr.sat.label', value: 'sabado' },
      { id: 7, checked: false, name: 'common.weekDaysAbbr.sun.label', value: 'domingo' },
    ];
  }

  get dailyRanges() {
    return this.createAvailability.get('dailyRanges') as FormArray;
  }
  public menu = [];

  options: any;
  calendar: boolean;
  public disponibilidad: any;
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

  timeUpdated = new Subject<string>();

  date: { year: string; month: string };
  //time = { hour: 13, minute: 30 };

  daysSelected = [];

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
    // eventsSet: this.handleEvents.bind(this),
    locales: [esLocale, ptLocale],
    locale: this.translocoService.getActiveLang(),
  };
  showActiveDays: Boolean = false;
  showBlockedDays: Boolean = false;

  onCheckboxChange(e) {
    // console.log(e.target.checked, value);
    if (e.target.checked === true) {
      this.daysSelected.push(e.target.value);
    } else {
      for (var i = 0; i < this.daysSelected.length; i++) {
        if (this.daysSelected[i] === e.target.value) {
          this.daysSelected.splice(i, 1);
        }
      }
    }
    console.log(this.daysSelected);
  }

  initCalendar() {
    setTimeout(() => {
      this.calendar = true;
    }, 260);
  }

  ngOnInit(): void {
    this.getAvailability();
    this.getAvailabilityBlocked();
    this.fetchCalendar();
    //this.calendar = true;

    this.createAvailability = this._formBuilder.group({
      objective: [null, Validators.required], //[Validators.required],
      appointmentDuration: [null, Validators.required],
      specialty: [null, Validators.required],
      specialtyName: new FormControl(),
      endDate: [null, [Validators.required]], // [Validators.required]
      startDate: [null], //new FormControl()
      dailyRanges: this._formBuilder.array([]),
    });

    this.availabilityBlocked = this._formBuilder.group({
      allDay: [null],
      dateBlock: [null, [Validators.required]],
      startBlock: [null],
      endBlock: [null],
    });

    this.agregardailyRanges();
    this.getSpecialtiesIdService();
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
    this.availabilityService.getAvailability().subscribe(
      (data) => {
        this.disponibilidad = data.payload;
        this.disponibilidad.forEach(element => {
          element.dateDetails.days = element.dateDetails.days.map(e => this.days.find(d => d.value == e).name);
        });
        console.log(this.disponibilidad);
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
        //console.log(this.diasBloqueados);
        this.fetchCalendar();
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
        specialtyId: this.createAvailability.controls.specialty.value,
      },
      dateDetails: {
        startDate: this.createAvailability.controls.startDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.daysSelected,
        dailyRanges: this.createAvailability.controls.dailyRanges.value,
      },
    };
    console.log(formObject);

    if (formObject) {
      this.availabilityService
        .postAvailability(formObject.administrativeDetails, formObject.professionalDetails, formObject.dateDetails)
        .subscribe(
          (data) => {
            this.createAvailability.reset();
            this.daysSelected = [];
            // console.log(this.days);
            this.getAvailability();
            this.fetchCalendar();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  putState(item) {
    console.log(item);
    this.availabilityService.updateState(item._id, item.administrativeDetails.isActive ? false : true).subscribe(
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

  postAvailabilityBlocked() {
    console.log(this.availabilityBlocked.controls.allDay.value);
    if (this.availabilityBlocked.controls.allDay.value === true) {
      const formObject = {
        date: this.availabilityBlocked.controls.dateBlock.value,
      };
      console.log(formObject);

      if (formObject) {
        this.availabilityService.postAvailabilityBlocked(formObject.date).subscribe(
          (data) => {
            console.log(data);
            this.getAvailabilityBlocked();
            this.fetchCalendar();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      const formObject = {
        date: this.availabilityBlocked.controls.dateBlock.value,
        start: this.availabilityBlocked.controls.startBlock.value,
        end: this.availabilityBlocked.controls.endBlock.value,
      };

      console.log(formObject);

      if (formObject) {
        this.availabilityService.postAvailabilityBlocked(formObject.date, formObject.start, formObject.end).subscribe(
          (data) => {
            console.log(data);
            this.getAvailabilityBlocked();
            this.fetchCalendar();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
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
        dailyRanges: this.createAvailability.controls.dailyRanges.value,
      },
    };
    console.log(formObject);
    console.log(formObject.dateDetails.endDate);

    if (formObject) {
      this.availabilityService
        .putAvailability(
          formObject.id,
          formObject.administrativeDetails,
          formObject.professionalDetails,
          formObject.dateDetails
        )
        .subscribe(
          (data) => {
            this.daysSelected = [];
            this.getAvailability();
            this.fetchCalendar();
          },
          (error) => {
            console.log(error);
          }
        );
    } /**/
  }

  // deleteBlock
  deleteBlock(id) {
    console.log(id);
    this.availabilityService.deleteBlock(id).subscribe(
      (data) => {
        console.log(data);
        this.getAvailabilityBlocked();
        this.fetchCalendar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  putAvailability(id) {
    //this.idAvailability = id;
    //console.log(this.idAvailability)
    this.availabilityService.getAvailability(id).subscribe(
      (data) => {
        this.idAvailability = data.payload[0];
        console.log(this.idAvailability);
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


        console.log(daysSeletected);

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

        this.daysSelected.forEach(e => {
          e.name = this.days.find(d => d.value == e.value).name;
        })

        this.idAvailability.dateDetails.days = this.idAvailability.dateDetails.days.map(e => this.days.find(d => d.value == e).name)

        console.log(this.daysSelected);

        this.endDate = this.dateAdapter.fromModel(
          moment(this.idAvailability.dateDetails.endDate).add('days').format('YYYY/MM/DD')
        );
        this.createAvailability.get('endDate').setValue(this.endDate);
        console.log(this.endDate);

        this.startDate = this.dateAdapter.fromModel(
          moment(this.idAvailability.dateDetails.startDate).add('days').format('YYYY/MM/DD')
        );
        this.createAvailability.get('startDate').setValue(this.startDate);

        this.createAvailability
          .get('appointmentDuration')
          .setValue(this.idAvailability.administrativeDetails.appointmentDuration);

        this.dailyRangeFormGroup.reset();

        this.dailyRangeFormGroup.get('start').setValue(this.idAvailability.dateDetails.dailyRanges[0].start);
        this.dailyRangeFormGroup.get('end').setValue(this.idAvailability.dateDetails.dailyRanges[0].end);
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
    this.availabilityService.deleteAvailability(formObject).subscribe(
      (data) => {
        console.log(data);
        this.getAvailability();
        this.fetchCalendar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //GET sub especialidad
  getSpecialtiesIdService() {
    this.specialtiesService.getSpecialtiesId2().subscribe(
      (data) => {
        console.log(data);
        this.specialtiesId = data.payload;
        //this.bloquearSelect = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchCalendar() {
    setTimeout(() => {
      let events = [];
      forkJoin([
        this.availabilityService.getAvailabilitiesForCalendar(),
        this.availabilityService.getAvailabilityBlocked(),
      ]).subscribe((data) => {
        // console.log(data[0].payload);
        const availabilities = data[0].payload;
        const blockedDays = data[1].payload;

        Object.values(availabilities).forEach((disp: any) => {
          for (const item of disp) {
            events.push(
              /*
              {
                type: 'active',
                title: 'Dia Habilitado',
                date: moment.utc(disp[0].date).format('YYYY-MM-DD'),
                color: '#6fc1f1',
              },
              */
              {
                type: 'active',
                title: `${item.administrativeDetails?.objective}: ${item.professionalDetails.specialtyDetails[0].specialtyName}`,
                start: `${moment.utc(item.date).format('YYYY-MM-DD')}T${item.dailyRange[0].start}`,
                end: `${moment.utc(item.date).format('YYYY-MM-DD')}T${item.dailyRange[0].end}`,
                color: '#6fc1f1',
              }
            );
          }
        });

        for (const block of blockedDays) {
          // console.log(block);
          if (block.dateDetails.range) {
            // console.log(block);
            events.push({
              type: 'blocked',
              title: this.translocoService.translate('disponibility.tabs.calendar.blockedDay.label'),
              start: `${moment.utc(block.dateDetails.date).format('YYYY-MM-DD')}T${block.dateDetails.range.start}`,
              end: `${moment.utc(block.dateDetails.date).format('YYYY-MM-DD')}T${block.dateDetails.range.end}`,
              color: '#ff5971',
            });
          } else {
            events.push({
              type: 'blocked',
              title: this.translocoService.translate('disponibility.tabs.calendar.blockedTime.label'),
              date: moment.utc(block.dateDetails.date).format('YYYY-MM-DD'),
              color: '#ff5971',
            });
          }
        }

        if (this.showActiveDays && this.showBlockedDays) {
          this.calendarOptions.events = events;
        } else if (!this.showActiveDays && !this.showBlockedDays) {
          this.calendarOptions.events = events;
        } else {
          if (this.showActiveDays) events = events.filter((item) => item.type === 'active');
          if (this.showBlockedDays) events = events.filter((item) => item.type === 'blocked');
        }
      });

      this.calendarOptions.events = events;
    }, 2000);
  }

}

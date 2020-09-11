import { Component, OnInit, AfterViewInit, ElementRef, Input, Output, TemplateRef } from '@angular/core';
import { merge, Subject, Observable, forkJoin } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';
import { Element } from '@angular/compiler';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';
//import { NgbdTimepickerBasic } from './timepicker-basic';

//services
import { AvailabilityService } from '../../services/availability.service';
import { ProfessionalService } from './../../../../services/professional.service';
import { SpecialtiesService } from './../../../../services/specialties.service';

import * as moment from 'moment';

import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbTimepicker,
  NgbTimepickerConfig,
  NgbTimeStruct, NgbTimeAdapter
} from '@ng-bootstrap/ng-bootstrap';
const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

// carrusel
@Component({
  selector: 'app-mi-disponibilidad',
  templateUrl: './mi-disponibilidad.component.html',
  styleUrls: ['./mi-disponibilidad.component.scss'],
  providers: [DatePipe, {provide: NgbTimeAdapter, useClass: MiDisponibilidadComponent}]
})

export class MiDisponibilidadComponent implements OnInit {
  public datePipeString : string;

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }
  time: '13:30:00';

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}` : null;
  }


  constructor(
    private elementRef: ElementRef,
    private availabilityService: AvailabilityService,
    private _formBuilder: FormBuilder,
    private calendario: NgbCalendar,
    private config: NgbTimepickerConfig,
    private datePipe: DatePipe,
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
      day: this.minDate.day
    };
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
  public availabilityBlocked: FormGroup;
  idAvailability: any;
  public specialties: string;
  public specialtiesId: string;
  public medicalSpecialties: any;
  public state: any;

  timeUpdated = new Subject<string>();

  model: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;
  model4: NgbDateStruct;
  model5: NgbDateStruct;

  date: { year: string; month: string };
  //time = { hour: 13, minute: 30 };

  days: Array<any> = [
    { name: 'Lun', value: 'lunes' },
    { name: 'Mar', value: 'martes' },
    { name: 'Mie', value: 'miercoles' },
    { name: 'Jue', value: 'jueves' },
    { name: 'Vie', value: 'viernes' },
    { name: 'Sab', value: 'sabado' },
    { name: 'Dom', value: 'domingo' },
  ];
  days3: Array<any> = [
    { name: 'Lun', value: 'lunes' },
    { name: 'Mar', value: 'martes' },
    { name: 'Mie', value: 'miercoles' },
    { name: 'Jue', value: 'jueves' },
    { name: 'Vie', value: 'viernes' },
    { name: 'Sab', value: 'sabado' },
    { name: 'Dom', value: 'domingo' },
  ];

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

  especialidades: Array<any> = [
    { min: 'Medicina general', value: 'Medicina general' },
    { min: 'Cardiología', value: 'Cardiología' },
    { min: 'Neurología', value: 'Neurología' },
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
    this.getAvailability();
    this.getAvailabilityBlocked();
    this.calendar = true;

    this.createAvailability = this._formBuilder.group({
      objective: [null, [Validators.required]],//[Validators.required],
      appointmentDuration: new FormControl(),
      specialty:  new FormControl(),
      specialtyName:  new FormControl(),
      endDate:  [null, [Validators.required]],// [Validators.required]
      startDate: [null],//new FormControl()
      dailyDetails: this._formBuilder.array([], ),//[Validators.required]
      dailyRanges: this._formBuilder.array([])
    });

    this.availabilityBlocked = this._formBuilder.group({
      dateBlock: [null, [Validators.required, Validators.minLength(2)]],
      startBlock: [null, [Validators.required, Validators.minLength(2)]],
      endBlock: [null, [Validators.required, Validators.minLength(2)]],
    });

    this.agregardailyRanges();
    this. getSpecialtiesIdService();
    //this.getProfessionalSpecialties();
  }

  // controls reactivos
  agregardailyRanges() {
    const dailyRangeFormGroup = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
    
    this.dailyRanges.push(dailyRangeFormGroup);
  }

  removerDailyRanges(indice: number) {
    this.dailyRanges.removeAt(indice);
  }

  getAvailability() {
    this.availabilityService.getAvailability().subscribe(
      (data) => {
        this.disponibilidad = data.payload;
        this.fetchCalendar();
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
        //this.getSpecialtiesIdService(this.medicalSpecialties[0]._id);
        /*
        if(this.medicalSpecialties.lenght === 0){
          console.log(this.medicalSpecialties[0]);
          
        }*/
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
        // console.log(data);
        this.diasBloqueados = data.payload;
        this.fetchCalendar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crearAvailability() {
    console.log(this.createAvailability);
    console.log(this.createAvailability.controls.specialty);


    const formObject = {
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: +this.createAvailability.controls.appointmentDuration.value,
      },
      professionalDetails: {
        specialtyId: this.createAvailability.controls.specialty.value
      },
      dateDetails: {
        startDate: this.createAvailability.controls.startDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRanges: this.createAvailability.controls.dailyRanges.value
      }
    };
    console.log(formObject);

    if (formObject) {
      this.availabilityService
        .postAvailability(formObject.administrativeDetails, formObject.professionalDetails, formObject.dateDetails)
        .subscribe(
          (data) => {
            console.log('disponibilidad creada', data);
            this.getAvailability();
          },
          (error) => {
            console.log(error);
          }
        );
      /**/
    }
  }

  putState(item) {
    console.log(item);
    this.availabilityService.updateState(item._id, item.administrativeDetails.isActive).subscribe(
      (data) => {
        console.log(data);
        this.state = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postAvailabilityBlocked() {
    console.log(this.availabilityBlocked);
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
          this.getAvailability();
          this.getAvailabilityBlocked();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  putAvailability2(id) {
    //this.createAvailability = id;
    console.log(id);
    console.log(this.createAvailability);
    const formObject = {
      id,
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: +this.createAvailability.controls.appointmentDuration.value,
      },
      professionalDetails: {
        specialtyId: this.createAvailability.controls.specialty.value,
      },
      dateDetails: {
        startDate: this.createAvailability.controls.startDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRanges: this.createAvailability.controls.dailyRanges.value,
      },
    };
    console.log(formObject);
    console.log(formObject.dateDetails.endDate);
    /*
    if (formObject.dateDetails.endDate = ""){
      console.log("date vacio");
    }else {
      console.log("con data");
    }*/

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
            console.log(data);
            this.getAvailability();
          },
          (error) => {
            console.log(error);
          }
        );
    } /**/
  }

  putAvailability3(id) {
    //this.createAvailability = id;
    console.log(this.createAvailability);
    const formObject = {
      id,
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: +this.createAvailability.controls.appointmentDuration.value,
      },
      professionalDetails: {
        specialtyId: this.createAvailability.controls.specialty.value,
      },
      dateDetails: {
        startDate: this.createAvailability.controls.startDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRanges: this.createAvailability.controls.dailyRanges.value,
      },
    };
    console.log(formObject);

  }

  // deleteBlock
  deleteBlock(id) {
    console.log(id);
    this.availabilityService.deleteBlock(id).subscribe(
      (data) => {
        console.log(data);
        this.getAvailabilityBlocked();
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
        this.model2 = {
          year: this.idAvailability.dateDetails.startDate.year,
          month: this.idAvailability.dateDetails.startDate.month,
          day: this.idAvailability.dateDetails.startDate.day,
        };
        this.model4 = {
          year: this.idAvailability.dateDetails.endDate.year,
          month: this.idAvailability.dateDetails.endDate.month,
          day: this.idAvailability.dateDetails.endDate.day,
        };
      },
      (error) => {
        console.log(error);
      }
    );
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
    forkJoin([this.availabilityService.getAvailability(), this.availabilityService.getAvailabilityBlocked()]).subscribe(
      (data) => {
        const availabilities = data[0].payload; // this will contain roleData
        const blockedDays = data[1].payload; // this will contain user

        let events = [];
        //this.datePipeEnd = datePipe.transform(Date.now(),'yyyy-MM-dd');

        for (const disp of availabilities) {
          // console.log(disp);
          events.push(
            {
              type: 'active',
              title: 'Dia Habilitado',
              start: moment.utc(disp.dateDetails.startDate).format('YYYY-MM-DD'),
              end: moment.utc(disp.dateDetails.endDate).format('YYYY-MM-DD'),
              color: '#6fc1f1',
            },
            {
              type: 'active',
              title: disp.administrativeDetails.objective,
              start: `${moment.utc(disp.dateDetails.startDate).format('YYYY-MM-DD')}T${
                disp.dateDetails.dailyRanges[0].start
              }`,
              end: `${moment.utc(disp.dateDetails.startDate).format('YYYY-MM-DD')}T${disp.dateDetails.dailyRanges[0].end}`,
              color: '#6fc1f1',
            }
          );
        }

        for (const block of blockedDays) {
          // console.log(block);
          events.push(
            {
              type: 'blocked',
              title: 'Dia Bloqueado',
              date: moment.utc(block.dateDetails.date).format('YYYY-MM-DD'),
              color: '#ff5971',
            },
            {
              type: 'blocked',
              start: `${moment.utc(block.dateDetails.date).format('YYYY-MM-DD')}T${block.dateDetails.range.start}`,
              end: `${moment.utc(block.dateDetails.date).format('YYYY-MM-DD')}T${block.dateDetails.range.end}`,
              color: '#ff5971',
            }
          );
        }

        if (this.showActiveDays && this.showBlockedDays) {
          this.calendarOptions.events = events;
        } else if (!this.showActiveDays && !this.showBlockedDays) {
          this.calendarOptions.events = events;
        } else {
          if (this.showActiveDays) events = events.filter((item) => item.type === 'active');
          if (this.showBlockedDays) events = events.filter((item) => item.type === 'blocked');
        }

        this.calendarOptions.events = events;
      }
    );

    /*

    // alert('test');
    const events = [];
    for (const disp of disponibilidad) {
      // console.log(disp);
      events.push(
        {
          title: 'Dia Habilitado',
          date: moment(disp.dateDetails.startDate).format('YYYY-MM-DD'),
          description: disp.professionalDetails.specialtyDetails[0].specialtyName,
        },
        {
          title: disp.administrativeDetails.objective,
          start: `${moment(disp.dateDetails.startDate).format('YYYY-MM-DD')}T${disp.dateDetails.dailyRanges[0].start}`,
          end: `${moment(disp.dateDetails.startDate).format('YYYY-MM-DD')}T${disp.dateDetails.dailyRanges[0].end}`,
        }
      );
    }

    console.log(events);
    this.calendarOptions.events = events;
    */
  }
}

import { Component, OnInit, AfterViewInit, ElementRef, Input, Output, TemplateRef } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';
import { Element } from '@angular/compiler';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { AvailabilityService } from '../../services/availability.service';
import { ValueTransformer } from '@angular/compiler/src/util';

import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbTimepicker,
} from '@ng-bootstrap/ng-bootstrap';

// carrusel
@Component({
  selector: 'app-mi-disponibilidad',
  templateUrl: './mi-disponibilidad.component.html',
  styleUrls: ['./mi-disponibilidad.component.scss'],
})
export class MiDisponibilidadComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private availabilityService: AvailabilityService,
    private _formBuilder: FormBuilder,
    private calendario: NgbCalendar,
    private config: NgbDatepickerConfig
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
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

  timeUpdated = new Subject<string>();

  model: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;

  date: { year: string; month: string };
  time = { hour: 13, minute: 30 };

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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-07-21' },
      { title: 'event 2', date: '2020-07-20' },
    ],
  };

  model4: NgbDateStruct;

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
    }, 200);
  }

  ngOnInit(): void {
    this.getAvailability();
    this.getAvailabilityBlocked();
    this.calendar = false;

    this.createAvailability = this._formBuilder.group({
      
      objective: [null],
      appointmentDuration: [null], 
      specialty: [null],
      endDate: [null, [Validators.required]], 
      starDate: [null, [Validators.required]],
      dailyDetails: this._formBuilder.array([], [Validators.required]),
      dailyRanges: this._formBuilder.array([])

      /*/*
      administrativeDetails: {
        objective: this.createAvailability.controls.dailyDetails.value,
        appointmentDuration: this.createAvailability.controls.dailyRanges.value,
      },
      professionalDetails:{
        specialtyId: this.createAvailability.controls.specialty.value
      },
      dateDetails : {
        endDate:this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRange: this.createAvailability.controls.dailyRanges.value
      }*/
    });

    this.availabilityBlocked = this._formBuilder.group({
      dateBlock: [null, [Validators.required, Validators.minLength(2)]],
      startBlock: [null, [Validators.required, Validators.minLength(2)]],
      endBlock: [null, [Validators.required, Validators.minLength(2)]],
    });

    this.agregardailyRanges();
  }

  // controls reactivos
  agregardailyRanges() {
    const dailyRangeFormGroup = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
    });
    this.dailyRanges.push(dailyRangeFormGroup);
  }

  getAvailability() {
    this.availabilityService.getAvailability().subscribe(
      (data) => {
        console.log(data);
        this.disponibilidad = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailabilityBlocked() {
    this.availabilityService.getAvailabilityBlocked().subscribe(
      (data) => {
        console.log(data);
        this.diasBloqueados = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crearAvailability() {
    console.log(this.createAvailability);
    const formObject = {

      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: +this.createAvailability.controls.appointmentDuration.value
      },
      professionalDetails:{
        specialtyId:  this.createAvailability.controls.specialty.value,
      },
      dateDetails : {
        startDate:this.createAvailability.controls.endDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRanges: this.createAvailability.controls.dailyRanges.value,
      }
     
    };
    console.log(formObject);

    if (formObject) {
      this.availabilityService
        .postAvailability(
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
    }
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
    console.log(this.createAvailability);
    const formObject = {
      id,
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: +this.createAvailability.controls.appointmentDuration.value
      },
      professionalDetails:{
        specialtyId:  this.createAvailability.controls.specialty.value,
      },
      dateDetails : {
        startDate:this.createAvailability.controls.endDate.value,
        endDate: this.createAvailability.controls.endDate.value,
        days: this.createAvailability.controls.dailyDetails.value,
        dailyRanges: this.createAvailability.controls.dailyRanges.value,
      }
    };
    console.log(formObject);

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
    }
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
    this.idAvailability = id;
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
        const arrayDias = [];
        const arraydays = [];
        const arrayDaystotal = [];
        // console.log(this.days2);

        for (const item2 of this.days2) {
          // console.log(item2);
          for (const item of this.idAvailability.dailyDetails.days) {
            if (item) {
              if (item === item2) {
                const item3 = item2 + '2';
                // console.log(item3)
              }
            }
          }
        }
        console.log(arrayDias);
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
}

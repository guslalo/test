import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Element } from '@angular/compiler';
import { SharedModule } from '../../../../shared/shared.module';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray  } from '@angular/forms';
import { AvailabilityService } from '../../services/availability.service';
import { ValueTransformer } from '@angular/compiler/src/util';

import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-mi-disponibilidad',
  templateUrl: './mi-disponibilidad.component.html',
  styleUrls: ['./mi-disponibilidad.component.scss']
})

export class MiDisponibilidadComponent implements OnInit {
  options: any;
  calendar:boolean;
  disponibilidad: any;
  public createAvailability:FormGroup;
  public availabilityDays:FormGroup;

   
  model: NgbDateStruct;
  date: {year: string, month: string};
  time = {hour: 13, minute: 30};

  days: Array<any> = [
    { name: 'Lun', value: 'lunes' },
    { name: 'Mar', value: 'martes' },
    { name: 'Mie', value: 'miercoles' },
    { name: 'Jue', value: 'jueves' },
    { name: 'Vie', value: 'viernes' },
    { name: 'Sab', value: 'sabado' },
    { name: 'Dom', value: 'domingo' }
  ];

  constructor(
    private elementRef:ElementRef,
    private availabilityService:AvailabilityService,
    private _formBuilder: FormBuilder,
    private calendario: NgbCalendar
    ) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-07-21' },
      { title: 'event 2', date: '2020-07-20' }
    ]
  };

  onCheckboxChange(e) {
    const dailyDetails: FormArray = this.createAvailability.get('dailyDetails') as FormArray;

    if (e.target.checked) {
      dailyDetails.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      dailyDetails.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          dailyDetails.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  initCalendar(){
    setTimeout (() => {
      this.calendar = true;
   }, 200);
  
  }

  ngOnInit(): void {
    this.getAvailability();
    this.calendar = false;

    this.createAvailability = this._formBuilder.group({
      objective: [null, [Validators.required, Validators.minLength(2)]],
      specialty: [null, [Validators.required, Validators.minLength(2)]],
      appointmentDuration: [null, [Validators.required, Validators.minLength(2)]],
      endDate: [null, [Validators.required, Validators.minLength(2)]],
      dailyDetails:this._formBuilder.array([], [Validators.required])
    });
  

    

  }
  

  getAvailability(){
    this.availabilityService.getAvailability().subscribe(
      data => {
        console.log(data);
        this.disponibilidad = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  crearAvailability(){
    console.log(this.createAvailability);
    const formObject = {
      objective:this.createAvailability.controls.objective.value,
      specialty:this.createAvailability.controls.specialty.value,
      appointmentDuration:this.createAvailability.controls.appointmentDuration.value,
      endDate:{
        day:"2",
        month:4,
        year:"2021"
      }, //this.createAvailability.controls.endDate.value
      dailyDetails: {
        days:this.createAvailability.controls.dailyDetails.value,
        dailyRanges:
          [
              {
                start: "9:00",
                end: "10:00"
              },
              {
                start: "14:00",
                end: "16:00"
              }
          ]
      }     
    }
    console.log(formObject);
 
    if (formObject) {
      this.availabilityService.postAvailability(  
        formObject.objective,
        formObject.specialty,
        formObject.appointmentDuration,
        formObject.endDate,
        formObject.dailyDetails
        ).subscribe(
        data => {
          console.log(data);
          this.getAvailability();
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}

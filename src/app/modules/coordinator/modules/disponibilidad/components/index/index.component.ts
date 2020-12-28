import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

//services
import { CoordinatorService } from './../../../../../../services/coordinator.service';
import { AvailabilityService } from './../../../../../../services/availability.service';
import { ProfessionalService } from './../../../../../../services/professional.service';
import { SpecialtiesService } from './../../../../../../services/specialties.service';

import * as moment from 'moment';

import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { TranslocoService } from '@ngneat/transloco';
import { NgxPermissionsService } from 'ngx-permissions';
import { startWith, map } from 'rxjs/operators';
import { AppointmentsService } from 'src/app/services/appointments.service';
const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public datePipeString: string;
  dateAdapter = new CustomDateAdapter();
  moment: any = moment;
  ColumnMode = ColumnMode;
  searchTerm: string = '';
  public seleccionE:boolean;

  public objetives; any;

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
    private specialtiesService: SpecialtiesService,
    private translocoService: TranslocoService,
    private permissionsService: NgxPermissionsService,
    private appointmentService: AppointmentsService
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
  public disponibilidadArrayTemp = [];
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
  public filteredProfessionals: Observable<any[]>;
  public professionals = [];
  public tempProfessionals = [];

  medicalSpecialty: string;
  specialtyMap = [];
  AllSpecialtyMap = [];
  professionalSelected: string;
  specialtySelected: string;

  timeUpdated = new Subject<string>();

  date: { year: string; month: string };
  //time = { hour: 13, minute: 30 };

  days: Array<any> = [
    { id: 1, checked: false, name: 'common.weekDaysAbbr.mon.label', value: 'lunes' },
    { id: 2, checked: false, name: 'common.weekDaysAbbr.tue.label', value: 'martes' },
    { id: 3, checked: false, name: 'common.weekDaysAbbr.wed.label', value: 'miercoles' },
    { id: 4, checked: false, name: 'common.weekDaysAbbr.thu.label', value: 'jueves' },
    { id: 5, checked: false, name: 'common.weekDaysAbbr.fri.label', value: 'viernes' },
    { id: 6, checked: false, name: 'common.weekDaysAbbr.sat.label', value: 'sabado' },
    { id: 7, checked: false, name: 'common.weekDaysAbbr.sun.label', value: 'domingo' },
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

  getObjetives(){
    this.appointmentService
    .getObjetives()
    .subscribe((data) => {
      this.objetives = data
    })
  }

  initCalendar() {
    setTimeout(() => {
      this.calendar = true;
    }, 260);
  }

  ngOnInit(): void {
    this.getProfessionals();
    this.getProfessionalSpecialties();
    this.getSpecialties();
    this.getAvailability();

    var permissions = this.permissionsService.getPermissions();

    this.permissionsService.permissions$.subscribe((permissions) => {
      console.log('CONTROLLER ', permissions)
    })


    this.createAvailability = this._formBuilder.group({
      professional: [null, Validators.required],
      specialty: [null, Validators.required],
      specialtyName: new FormControl(),
      objective: [null, [Validators.required]], //[Validators.required],
      appointmentDuration: [5,  [Validators.required]],
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

    this.filteredProfessionals = this.createAvailability.controls['professional'].valueChanges.pipe(startWith(''), map(newVal => {
      if(typeof newVal?.toLowerCase === 'function'){
        return this.professionals.filter(value => {
          console.log(value);
          return value.personalData.name?.toLowerCase().includes(newVal?.toLowerCase()) ||
                value.personalData.secondLastName?.toLowerCase().includes(newVal?.toLowerCase()) ||
                (value.personalData.name + ' ' + value.personalData.secondLastName).toLowerCase().includes(newVal?.toLowerCase())
        }) 
      }
    }))

    
    this.getObjetives()
    this.agregardailyRanges();
  }

  /*
  resetAutoInput(optVal, trigger: MatAutocompleteTrigger, auto: MatAutoComplete) {
    setTimeout(_ => {
      auto.options.forEach((item) => {
        item.deselect()
      });
      this.createAvailability.controls['professional'].reset('');
      trigger.openPanel();
      }, 100);
  }*/

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
  selectSpecialty(selectSpecialty){
    let item = selectSpecialty.target.value
    if (item!= 'undefined' && item!= '' && item!= null){
      this.seleccionE = false;
    }
    console.log(selectSpecialty.target.value);
  }

  removerDailyRanges(indice: number) {
    this.dailyRanges.removeAt(indice);
  }

  getAvailability() {
    this.disponibilidadArray = [];
    this.coordinatorService.getAvailability().subscribe(
      (data) => {
        console.log('getAvailability', data.payload);
        let availabilities = data.payload.filter((item) => !item.isDeleted);
        this.disponibilidadArrayTemp = [...availabilities];
        this.disponibilidadArray = availabilities;
        this.disponibilidadArray.forEach(element => {
          element.dateDetails.days = element.dateDetails.days.map(e => this.days.find(d => d.value == e).name);
        })
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
        // console.log(this.medicalSpecialties[0]._id);
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

  getSpecialties() {
    this.specialtiesService.getSpecialties().subscribe((data) => {
      // console.log(data);
      this.AllSpecialtyMap = data.reduce((obj, item) => {
        obj[item._id] = item;
        return obj;
      }, {});
    });
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

  resetForm(){
    this.createAvailability.reset();
  }

  crearAvailability() {
    console.log(this.createAvailability);
    console.log(this.createAvailability.controls.specialty.value);

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
        days: this.daysSelected,
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
            this.resetSearch();
          },
          (error) => {
            this.resetSearch();
            console.log(error);
          }
        );
    }
  }

  putState(item) {
    console.log(item);
    this.availabilityService
      .updateStateCoordinator(item._id, item.administrativeDetails.isActive ? false : true)
      .subscribe(
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
    console.log(this.professionalSelected);

    const formObject = {
      id,
      administrativeDetails: {
        objective: this.createAvailability.controls.objective.value,
        appointmentDuration: parseInt(this.createAvailability.controls.appointmentDuration.value),
      },
      professionalDetails: {
        userId: this.professionalSelected,
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

  putAvailability(row) {
    let _id = row._id
    this.professionalSelected = row.professionalDetails.userId

    //this.idAvailability = id;
    //console.log(this.idAvailability)
    this.availabilityService.getAvailabilityCoordinator(_id).subscribe(
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
          let i = daysSeletected.map((item) => item.value).indexOf(this.days[index].value)
          if (i === -1) {
            // console.log(true);
            return d;
          } else {
            daysSeletected[i].id = this.days[index].id
            daysSeletected[i].name = this.days[index].name
          }
        });

        this.daysSelected = [...daysSeletected, ...filteredDays].sort((a, b) => {
          return a.id - b.id;
        });
        this.idAvailability.dateDetails.days = this.idAvailability.dateDetails.days.map(e => this.days.find(d => d.value == e).name)

        console.log(moment(this.idAvailability.dateDetails.endDate).utc(false).format('YYYY/MM/DD'));

        this.endDate = this.dateAdapter.fromModel(
          moment(this.idAvailability.dateDetails.endDate).utc(false).format('YYYY/MM/DD')
        );
        this.createAvailability.get('endDate').setValue(this.endDate);

        this.startDate = this.dateAdapter.fromModel(
          moment(this.idAvailability.dateDetails.startDate).utc(false).format('YYYY/MM/DD')
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
    let _userId

    if(professional?.userData){
      _userId = professional?.userData[0]._id;
    }

    //this.getProfessionals();
    this.specialtiesId = '';
    this.medicalSpecialty = '';
    this.specialtySelected = '';
    //console.log(professional);
    //let userId = '';
    let userId = this.professionalSelected || _userId

    this.specialtiesService.getSpecialtiesForProfessional(userId).subscribe(
      (data) => {
        this.specialtiesId = data.payload;
        this.medicalSpecialty = data.payload[0].medicalSpecialtyId;
        this.specialtySelected = data.payload[0].specialtyName;
        // this.professionalSelected  = '';
      },
      (error) => {
        console.log(error);
      }
    );
   this.resetSearch();
  }

  resetSearch(){
    this.filteredProfessionals = this.createAvailability.controls['professional'].valueChanges.pipe(startWith(''), map(newVal => {
      if(typeof newVal?.toLowerCase === 'function'){
        return this.professionals.filter(value => {
          // console.log(value);
          return value.personalData.name?.toLowerCase().includes(newVal?.toLowerCase()) ||
                value.personalData.secondLastName?.toLowerCase().includes(newVal.toLowerCase()) ||
                (value.personalData.name + ' ' + value.personalData.secondLastName).toLowerCase().includes(newVal.toLowerCase())
        })
      }      
    }))
  }

  getProfessionals() {
    this.professionalService.getProfessionals().subscribe(
      (data) => {
        // console.log(data);
        this.tempProfessionals = [...data];
        this.professionals = data;
        console.log(this.professionals);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilters() {
    const searchTerm = this.searchTerm.toLowerCase();
    var temp = [];

    temp = this.disponibilidadArrayTemp
      // SEARCH FILTER
      .filter((disp) => {
        // console.log(disp);
        return (
          disp.dateDetails.startDate.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          disp.dateDetails.endDate.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          disp.dateDetails.dailyRanges[0].start.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          disp.dateDetails.dailyRanges[0].end.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          disp.administrativeDetails.objective.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          this.AllSpecialtyMap[disp.professionalDetails?.specialtyId]?.specialtyName
            .toString()
            .toLowerCase()
            .indexOf(searchTerm) !== -1 ||
          disp.professionalName[0].personalData.name.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          disp.professionalName[0].personalData.lastName.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      });
    this.disponibilidadArray = temp;
    // console.log(temp);
  }
}

import { Component, OnInit } from '@angular/core';
import { reserve } from './../../../../../../models/reserve';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//services
import { AgendarService } from './../../services/agendar.service';
import { ProfessionalService } from './../../../../../../services/professional.service';
import { SpecialtiesService } from './../../../../../../services/specialties.service';
import { SymptomsService } from './../../../../../../services/symptoms.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';


//datepicker
import {  NgbDateStruct, NgbCalendar,NgbDateParserFormatter,NgbDatepickerConfig,NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public specialties:string;
  public specialtiesId:string;
  public blocks:any;
  public symptoms:any;
  public consolidate:any;
  public medicalSpecialties:any;
  public professional:string;
  public sintomaSelected = [];
  public minDate = undefined;
  public model: NgbDateStruct;
  public descripcionSintoma: any;
  public reserve: any;
  public date: { year: number; month: number };



  constructor(
    private agendarService:AgendarService,
    private professionalService:ProfessionalService,
    private specialtiesService:SpecialtiesService,
    private symptomsService: SymptomsService,
    private appointmentsService:AppointmentsService,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const current = new Date();

    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    this.getMedicalSpecialties();
    this.getSpecialtiesService();
  
    this.getProfessionalService();
    this.getsymptoms();
   
  }

  //selecion sintoma
  onChange(deviceValue) {
   
    this.consolidate.patientDetails.symptoms.push(deviceValue.value);
    console.log(deviceValue);
    this.sintomaSelected.push(deviceValue.selectedOptions[0].innerText);
    console.log(this.consolidate); /**/
    
  }

  onChangeTypeProfesional(id){
    console.log(id);
    this.getSpecialtiesIdService(id);
  }

  onChangeTypeSpecialtiesId(value){
    console.log(value);
    /*
    this.reserve = new reserve(
      this.reserve.professionalDetails = value,
      null
    )*/
    this.reserve = {
      professionalDetails: {
          userId: null,
          specialtyId: value
      },
      dateDetails: {
          date: {
              year: null,
              month: null,
              day: null
          },
          start: null
      }
    }
    
    console.log(this.reserve)
    /*this.reserve.id = id;
    ;*/
  }

  agendar(){
    this.consolidate.patientDetails.description = this.descripcionSintoma;
    this.postConsolidateService(this.consolidate);
  }

  

  opcionSeleccionado:any;
  verSeleccion: any;
  value:any;

  //;

  status: boolean = false;
  selectedLevel:any;
  seleccionSintoma(item){
    
    console.log(item)
  }
  selectSintoma = false;

  blockSelected(item, item2){
    console.log(item);
    this.selectSintoma = true
    this.reserve.dateDetails.start = item2;
    this.reserve.professionalDetails.userId = item.professionalDetails.userId;
    console.log(this.reserve);
    this.appointmentsService.postReserve(this.reserve).subscribe(
      data => {
        console.log(data);
        this.consolidate = {
          id: data.payload.id,
          patientDetails: {
            symptoms: [ ],
            description: null
          }
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  //consolidar cita
  postConsolidateService(consolidate){
    this.appointmentsService.postConsolidate(consolidate).subscribe(
      data => {
        this.consolidate = data;
        console.log(data);
        this.router.navigate(['resultado'], {relativeTo: this.route});
      },
      error => {
        console.log(error)
      }
    ) 
  }

  getsymptoms() {
    this.symptomsService.getSymptoms().subscribe(
      data => {
        this.symptoms = data;
      },
      error => {
        console.log(error)
      }
    ) 
  } 

  getProfessionalService() {
    this.professionalService.getProfessionals().subscribe(
      data => {
        this.professional = data;
      },
      error => {
        console.log(error)
      }
    ) 
  } 
 

  getPostBlocks(date) {
    const object = {
        month: date.month,
        year: date.year,
        day: date.day
    }
  
    this.reserve.dateDetails.date = object;
    console.log(this.reserve);
    console.log(object)
      this.agendarService.postBlocks(object).subscribe(
        data => {
          this.blocks = data.payload;
          console.log(this.blocks)
        },
        error => {
          console.log(error)
        }
      ) /* */
    
  } 

  getSpecialtiesService(){
    this.specialtiesService.getSpecialties().subscribe(
      data => {
        this.specialties = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  getSpecialtiesIdService(id){
    this.specialtiesService.getSpecialtiesId(id).subscribe(
      data => {
        console.log(data);
        this.specialtiesId = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  getMedicalSpecialties(){
    this.specialtiesService.getMedicalSpecialties().subscribe(
      data => {
        this.medicalSpecialties = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  

}

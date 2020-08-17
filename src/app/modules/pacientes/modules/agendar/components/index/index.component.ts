import { Component, OnInit } from '@angular/core';

//services
import { AgendarService } from './../../services/agendar.service';
import { ProfessionalService } from './../../../../../../services/professional.service';
import { SpecialtiesService  } from './../../../../../../services/specialties.service';
import { SymptomsService  } from './../../../../../../services/symptoms.service';

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
  public blocks:any;
  public symptoms:any;
  public professional:string;
  public sintomaSelected = [];
  public minDate = undefined;
  public model: NgbDateStruct;
  public date: { year: number; month: number };

  constructor(
    private agendarService:AgendarService,
    private professionalService:ProfessionalService,
    private specialtiesService:SpecialtiesService,
    private symptomsService: SymptomsService,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig
    ) { }

  ngOnInit(): void {
    const current = new Date();

    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    this.getSpecialtiesService();
    this.getProfessionalService();
    this.getsymptoms();
   
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.sintomaSelected.push(deviceValue);
    console.log(this.sintomaSelected); /**/
  }

  opcionSeleccionado:any;
  verSeleccion: any;
  value:any;

 

  status: boolean = false;
  selectedLevel:any;
  seleccionSintoma(item){
    
    console.log(item)
  }
  selectSintoma = false;

  blockSelected(){
    this.selectSintoma = true
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

}

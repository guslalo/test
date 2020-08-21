import { Component, OnInit } from '@angular/core';
import { reserve } from './../../../../../../models/reserve';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';

//services
import { AgendarService } from './../../services/agendar.service';
import { ProfessionalService } from './../../../../../../services/professional.service';
import { SpecialtiesService } from './../../../../../../services/specialties.service';
import { SymptomsService } from './../../../../../../services/symptoms.service';
import { DocumentService } from './../../../../../../services/document.service';
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
  public medicalSpecialties:any;
  public blocks:any;
  public symptoms:any;
  public consolidate:any;
  public professional:string;
  public sintomaSelected = [];
  public minDate = undefined;
  public model: NgbDateStruct;
  public descripcionSintoma: any;
  public reserve: any;
  public date: { year: number; month: number };
  public file: any;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public sinProfesionales:boolean;

  public bloquearSelect = true;
  public bloquearFecha = true;


  constructor(
    private agendarService:AgendarService,
    private professionalService:ProfessionalService,
    private specialtiesService:SpecialtiesService,
    private symptomsService: SymptomsService,
    private appointmentsService:AppointmentsService,
    private documentService:DocumentService,
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
    this.sintomaSelected.push(deviceValue.selectedOptions[0].innerText);
    console.log(this.consolidate); /**/
    
  }

  onChangeTypeProfesional(id){
    console.log(id);
    this.getSpecialtiesIdService(id);

  }

  
  onChangeTypeSpecialtiesId(value){
    console.log(value);
    this.bloquearFecha = false;
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


  atras(){
    this.selectSintoma = false;
  }


  //consolidar cita
  postConsolidateService(consolidate){
    console.log(consolidate);
    this.appointmentsService.postConsolidate(consolidate).subscribe(
      data => {
        this.consolidate = data.payload;
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
        
        this.symptoms = data.payload;
        console.log(this.symptoms)
      },
      error => {
        console.log(error)
      }
    ) 
  } 

  getProfessionalService() {
    this.professionalService.getProfessionals().subscribe(
      data => {
        this.professional = data.payload;
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
    console.log(this.reserve.professionalDetails.specialtyId);
    console.log(object)
      this.agendarService.postBlocks(
        object, this.reserve.professionalDetails.specialtyId //
      ).subscribe(
        data => {
          this.blocks = data.payload;
          console.log( data)
          console.log(data.internalCode)
          if(data.internalCode === 103){
            this.sinProfesionales = true;
          } else {
            this.sinProfesionales = false;
          }
        },
        error => {
          console.log(error)
        }
      ) /* */
    
  } 

  getSpecialtiesService(){
    this.bloquearSelect = true;
    this.specialtiesService.getSpecialties().subscribe(
      data => {
        this.specialties = data.payload;
        
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
        this.specialtiesId = data.payload;
        this.bloquearSelect = false;
      },
      error => {
        console.log(error)
      }
    )
  }

  getMedicalSpecialties(){
    this.specialtiesService.getMedicalSpecialties().subscribe(
      data => {
        console.log('Specialties', data);
        this.medicalSpecialties = data.payload;
       
      },
      error => {
        console.log(error)
      }
    )
  }


  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = [
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpg',
          'image/jpeg',
          'application/pdf',
          'image/png',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        /*
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    console.log(imgBase64Path);
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };*/
        console.log(reader.readAsDataURL(fileInput.target.files[0]));
        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}


changeListener($event) : void {
  this.readThis($event.target);
  this.postDocumentService($event.target);
}


postDocumentService(documentDetails?, base64?){
  console.log(documentDetails);
  let documentDetailsObject: {
    name: "encodedPixel.png",
    type: "exam",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
  }  
  this.documentService.postDocument(this.consolidate.id, documentDetails).subscribe(
    data => {
      console.log(data)
    },
    error => {
      console.log(error)
    }
  )
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.file = myReader.result;
    console.log(this.file )
    this.postDocumentService(myReader);
  }

  myReader.readAsDataURL(file);

}


}

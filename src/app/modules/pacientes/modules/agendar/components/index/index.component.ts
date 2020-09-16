import { Component, OnInit } from '@angular/core';
import { reserve } from './../../../../../../models/reserve';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';



//services
import { AgendarService } from './../../services/agendar.service';
import { ProfessionalService } from './../../../../../../services/professional.service';
import { SpecialtiesService } from './../../../../../../services/specialties.service';
import { SymptomsService } from './../../../../../../services/symptoms.service';
import { DocumentService } from './../../../../../../services/document.service';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { SafePipe } from './../../../../../../shared/pipes/sanitizer.pipe';

//datepicker
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbTimepicker,
} from '@ng-bootstrap/ng-bootstrap';

declare var $:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ SafePipe ]
})
export class IndexComponent implements OnInit {
  public specialties: string;
  public specialtiesId: string;
  public specialtiesIdReserve: string;
  public medicalSpecialties: any;
  public blocks: any;
  public symptoms: any;
  public consolidate: any;
  public professional: string;
  public sintomaSelected = [];
  public minDate = undefined;
  public model: NgbDateStruct;
  public descripcionSintoma: any;
  public reserve: any;
  public date: { year: number; month: number };
  public file: any;
  public base64: any;
  public textInputFile: any;
  public flujoProfesional: boolean = false;
  public urlPago:any;
  public urlConfirmacion:any;
  public estadoPagado:boolean = false;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public sinProfesionales: boolean;

  public bloquearSelect = true;
  public bloquearFecha = true;
  public trustedUrl : SafeResourceUrl;

  constructor(
    private agendarService: AgendarService,
    private professionalService: ProfessionalService,
    private specialtiesService: SpecialtiesService,
    private symptomsService: SymptomsService,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private router: Router,
    private route: ActivatedRoute,
    private domSanitizer : DomSanitizer,
    private safe: SafePipe
  ) {}

  ngOnInit(): void {
    const current = new Date();
    this.textInputFile = 'Seleccione Archivo';
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.getProfessionalService();
    this.getMedicalSpecialties();
    this.getSpecialtiesService();
    this.getsymptoms();
  }

  //selecion sintoma
  onChange(deviceValue) {
    this.consolidate.patientDetails.symptoms.push(deviceValue.value);
    let selectedSintoma = {
      id:deviceValue.value,
      text:deviceValue.selectedOptions[0].innerText
    }
    //console.log(selectedSintoma);
    this.sintomaSelected.push(selectedSintoma);
    console.log(this.consolidate); /**/
  }

  onChangeTypeProfesional(id) {
    this.flujoProfesional = false;
    console.log(id);
    this.getSpecialtiesIdService(id);
  }

  onChangeTypeSpecialtiesId(value) {
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
        specialtyId: value,
        specialtyDetails:{
          price:0
        },
      },
      dateDetails: {
        date: {
          year: null,
          month: null,
          day: null,
        },
        start: null,
      },
    };

    console.log(this.reserve);
  
  }

  agendar() {
    this.consolidate.patientDetails.description = this.descripcionSintoma;
    this.postConsolidateService(this.consolidate);
  }
  opcionSeleccionado: any;
  verSeleccion: any;
  value: any;

  status: boolean = false;
  selectedLevel: any;
  seleccionSintoma(item) {
    console.log(item);
  }
  selectSintoma = false;

  blockSelected(item, item2) {
    console.log(item);
    //console.log( item.professionalDetails.specialtyDetails[0].price);
    this.selectSintoma = true;
    this.reserve.dateDetails.start = item2;
    console.log(this.specialtiesIdReserve);
    console.log(this.reserve);
    this.reserve.professionalDetails.userId = item.professionalDetails.userId;
    this.reserve.professionalDetails.specialtyId =  this.specialtiesIdReserve;
    this.reserve.professionalDetails.specialtyDetails.price = item.professionalDetails.specialtyDetails[0].price;
    console.log(this.reserve);
    this.appointmentsService.postReserve(this.reserve).subscribe(
      (data) => {
        console.log(data);
        this.consolidate = {
          id: data.payload.id,
          patientDetails: {
            symptoms: [],
            description: null,
          },
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  atras() {
    this.selectSintoma = false;
  }

  //consolidar cita
  postConsolidateService(consolidate) {
    console.log(consolidate);
    this.appointmentsService.postConsolidate(consolidate).subscribe(
      (data) => {
        this.statusPago(consolidate.id);
        this.consolidate = data.payload;
        btoa(this.blocks);
        console.log(data);
        console.log(this.consolidate.paymentUrl);
        console.log(consolidate.id);
        this.urlConfirmacion = 'resultado/' + btoa(this.blocks);
        //this.router.navigate(['resultado/' + btoa(this.blocks)], { relativeTo: this.route });
        this.pago(this.consolidate.paymentUrl);
        $('#exampleModal').modal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  statusPago(id){
    let interval = 
    setInterval(() => {
      this.appointmentsService.getPaymentStatus(id).subscribe(
        data => {
          if(data.payload.isPaid === false){
            console.log('no pagado')
          } else {
            $('#exampleModal').modal('hide');
            this.router.navigate(['resultado/' + btoa(this.blocks)], { relativeTo: this.route });
            this.estadoPagado = true;
            console.log('pagado')
            clearInterval(interval);
          }
        }, 
        error => {
          console.log(error)
        }
      )
    }, 5000);  

   
  }

  cerrarPago(){
    console.log('aca');
    this.router.navigate(['resultado/' + btoa(this.blocks)], { relativeTo: this.route })
  }

  pago(url){
    this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getsymptoms() {
    this.symptomsService.getSymptoms().subscribe(
      (data) => {
        this.symptoms = data.payload;
        console.log(this.symptoms);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  escogerProfessional(event) {
    this.flujoProfesional = true;
    this.bloquearFecha = false;
    //console.log(event);
    this.reserve = {
      professionalDetails: {
        userId: event,
        specialtyId: null,
        specialtyDetails:{
          price:null
        }
      },
      dateDetails: {
        date: {
          year: null,
          month: null,
          day: null,
        },
        start: null,
      },
    };
      console.log(this.reserve);
    //this.reserve.professionalDetails.specialtyId = event;
  }

  getProfessionalService() {
    this.professionalService.getProfessionals().subscribe(
      (data) => {
        this.professional = data;
        console.log(this.professional);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
  }

  eliminaSintoma(item){
    this.removeElement(item);
    //let elemento = document.getElementById('5f5800f825152591e20ac381').outerHTML = "";
    
    console.log(this.consolidate);
    this.symptomsService.deleteSymptoms(this.consolidate.id, item).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPostBlocks(date) {
    if (this.flujoProfesional === true) {
      const object = {
        month: date.month,
        year: date.year,
        day: date.day,
      };

      this.reserve = {
        professionalDetails: {
          userId:this.reserve.professionalDetails.userId,
          specialtyDetails:{
            price:null
          }
        },
        professionalId: this.reserve.professionalDetails.userId,
        dateDetails: {
          date: {
            year: object.year,
            month: object.month,
            day: object.day,
          },
          start: null,
        },
      };

      //.reserve.dateDetails.date = object;
      console.log(this.reserve);
      console.log('flujo profesional');
      this.agendarService.postBlocksProfessionalId(object,  this.reserve.professionalId ).subscribe(
        (data) => {
          this.blocks = data.payload;
          //console.log();
          this.specialtiesIdReserve = this.blocks[0].professionalDetails.specialtyId
          console.log(this.specialtiesIdReserve );

          localStorage.removeItem('reserva');
          localStorage.setItem('reserva', JSON.stringify(this.blocks));
          console.log(data);
          //console.log(data.internalCode);
          /*
          if (data.internalCode === 103) {
            this.sinProfesionales = true;
          } else {
            this.sinProfesionales = false;
          }*/
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(date);
      const object = {
        month: date.month,
        year: date.year,
        day: date.day,
      };

      this.reserve.dateDetails.date = object;
      console.log(this.reserve.professionalDetails.specialtyId);
      console.log(object);
      //.getServicesBlocks(object, this.reserve.professionalDetails.specialtyId)
      this.agendarService
        .postBlocks(
          object,
          this.reserve.professionalDetails.specialtyId //
        )
        .subscribe(
          (data) => {
            this.blocks = data.payload;
            localStorage.removeItem('reserva');
            localStorage.setItem('reserva', JSON.stringify(this.blocks));
            console.log(data);
           // console.log(data.internalCode);
            if (data.internalCode === 103) {
              this.sinProfesionales = true;
            } else {
              this.sinProfesionales = false;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
    /* */
  }

  //trae lso bloques
  getServicesBlocks(date, specialtyId?) {
    console.log(date, specialtyId);
    this.agendarService
      .postBlocks(
        date,
        specialtyId //
      )
      .subscribe(
        (data) => {
          this.blocks = data.payload;
          localStorage.removeItem('reserva');
          localStorage.setItem('reserva', JSON.stringify(this.blocks));
          console.log(data);
          console.log(data.internalCode);
          if (data.internalCode === 103) {
            this.sinProfesionales = true;
          } else {
            this.sinProfesionales = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getSpecialtiesService() {
    this.bloquearSelect = true;
    this.specialtiesService.getSpecialties().subscribe(
      (data) => {
        this.specialties = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSpecialtiesIdService(id) {
    this.specialtiesService.getMedicalSpecialtiesId(id).subscribe(
      (data) => {
        console.log(data);
        this.specialtiesId = data.payload;
        this.bloquearSelect = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMedicalSpecialties() {
    this.specialtiesService.getMedicalSpecialties().subscribe(
      (data) => {
        console.log('Specialties', data);
        this.medicalSpecialties = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeListener(event): void {
    //this.readThis($event.target);
    console.log(event.target.files[0]);
    this.textInputFile = event.target.files[0].name;
    console.log(this.textInputFile);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.base64 = reader.result;
      console.log(this.base64);
      //this.postDocumentService(this.base64);
      const documentDetailsObject = {
        name: event.target.files[0].name,
        type: 'documento',
        data: this.base64.split(',')[1],
      };
      console.log(this.consolidate.id);
      this.documentService.postDocumentAppointment(this.consolidate.id, documentDetailsObject).subscribe(
       
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      ); /**/
    };
  }

  postDocumentService(base64) {
    /*
  console.log(base64);
  const documentDetailsObject: {
    name: "encodedPixel.png",
    type: "exam",
    data: this.base64 
  }  */
    /*
  this.documentService.postDocument(this.consolidate.id, documentDetailsObject).subscribe(
    data => {
      console.log(data)
    },
    error => {
      console.log(error)
    }
  )*/
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.file = myReader.result;
      console.log(this.file);
      this.postDocumentService(myReader);
    };

    myReader.readAsDataURL(file);
  }
}

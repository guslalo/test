import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { SymptomsService } from './../../../../../../services/symptoms.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from './../../../../../../services/document.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public appointmentId: any;
  public reserve: any;
  public symptoms: any;
  public urlConfirmacion: any;
  public estadoPagado: boolean = false;
  public trustedUrl: SafeResourceUrl;
  public sintomaSelected = [];
  public consolidate: any;
  public selectSintoma = false;
  public descripcionSintoma: any;
  public textInputFile: any;
  public base64: any;
  public sinPrecio: boolean;
  public documentsList:any;
  public access_token: any;
  public downloadUrl: any;

  constructor(
    private spinner: NgxSpinnerService,
    private appointmentsService: AppointmentsService,
    private symptomsService: SymptomsService,
    private domSanitizer: DomSanitizer,
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.textInputFile = 'Selecione Arquivo';
    this.urlConfirmacion = 'resultado/';
    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();

    $('#exampleModal').on('hidden.bs.modal', function (e) {
      //clearInterval(this.interval);
      //this.atras();
      //window.location.reload();
      console.log('closed');
    });

    this.appointmentsService.AppointmentInmediate().subscribe(
      (data) => {
        console.log(data);
        this.appointmentId = data.payload._id;
      },
      (error) => {
        console.log(error);
      }
    );
    this.getsymptoms();
  }

  statusPago(id) {
    let interval = setInterval(() => {
      this.spinner.hide();
      this.appointmentsService.getPaymentStatusAppointmentInmediate(id).subscribe(
        (data) => {
          console.log(data.payload.isPaid);
          if (data.payload.isPaid === false) {
            this.estadoPagado = false;
            console.log('no pagado');
          } else {
            clearInterval(interval);
            this.estadoPagado = true;
            console.log('pagado');
            $('#exampleModal').modal('hide');
            this.router.navigate(['resultado-cita/' + this.appointmentId], { relativeTo: this.route });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }, 3500);
  }

  atras() {
    this.selectSintoma = false;
  }

  //selecion sintoma
  onChange(deviceValue) {
    $("#selectSintomaId option:selected").attr('disabled','disabled');
    this.consolidate = {
      id: this.appointmentId,
      patientDetails: {
        symptoms: [],
        description: null,
      },
    };
    this.consolidate.patientDetails.symptoms.push(deviceValue.value);
    let selectedSintoma = {
      id: deviceValue.value,
      text: deviceValue.selectedOptions[0].innerText,
    };
    this.sintomaSelected.push(selectedSintoma);
    this.selectSintoma = true;
    console.log(this.consolidate);
  }

  removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
  }

  eliminaSintoma(item) {
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

  agendar() {
    this.spinner.show();
    this.consolidate.patientDetails.description = this.descripcionSintoma;
    console.log(this.consolidate);
    this.postImmediateConsolidate(this.consolidate);
  }

  //sintomas
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
      //console.log(this.consolidate.id);
      this.documentService.postDocumentAppointment(this.consolidate.id, documentDetailsObject).subscribe(
        (data) => {
          console.log(data);
          this.appointmentsService.getAppointmentsDetails(this.consolidate.id).subscribe(
            data => {
              console.log(data.payload.patientDetails.documentDetails)
              this.documentsList = data.payload.patientDetails.documentDetails;
            },
            error => {
              console.log(error)
            }
          )
        },
        (error) => {
          console.log(error);
        }
      );
    };
  }

  pago(url) {
    this.trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  postImmediateConsolidate(consolidate) {
    this.appointmentsService.postImmediateConsolidate(consolidate).subscribe(
      (data) => {
        console.log(data);
        if (data.payload && data.payload.paymentUrl) {
          this.pago(data.payload.paymentUrl);
          this.statusPago(consolidate.id);
          $('#exampleModal').modal();
        } else {
          this.sinPrecio = true;
          this.router.navigate(['resultado-cita/' + this.appointmentId], { relativeTo: this.route });
          //$('#sinPrecio').modal();
          console.log('no tiene precio');
        }
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //multi docs
  deleteDocument(path){
    this.documentService.deleteDocumentAppointment(this.appointmentId, path).subscribe(
      data => {
        console.log(data);
        this.appointmentsService.getAppointmentsDetails(this.appointmentId).subscribe(
          data => {
            console.log(data.payload.patientDetails.documentDetails)
            this.documentsList = data.payload.patientDetails.documentDetails;
          },
          error => {
            console.log(error)
          }
        )
      },
      error => {
        console.log(error);
      }
    )

  }

}

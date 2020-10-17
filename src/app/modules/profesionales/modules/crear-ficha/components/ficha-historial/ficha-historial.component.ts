import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { DocumentService } from './../../../../../../services/document.service';
import { environment } from './../../../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-ficha-historial',
  templateUrl: './ficha-historial.component.html',
  styleUrls: ['./ficha-historial.component.scss']
})
export class FichaHistorialComponent implements OnInit {
  @Input() idConsulta:any;
  public appointmentDetail: any;
  public access_token: any;
  public downloadUrl: any;
  public user: any;
  public userId: any;
  public timeline: any;
  public fecha: any;
  public professionalData: any;
  public appointmentId: any;
  public url: string;
  public antecedentes: any;
  public antecedentesGeneral: any;
  public exams: any;
  public fotoUser: any;
  public photoUrlBase = environment.photoUrlBase;
  public arrayDocuments: any;
  public urlSibrare: any;
  public descargar:any;
  constructor(
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    console.log(this.idConsulta);
        this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();

    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      console.log(params);
    });
   
    //this.appointmentId = this.idConsulta;
 
    this.getAppointmentsDetails(this.idConsulta);
    this.getVerifiedSibrareDocuments2(this.idConsulta);
  }

  getFecha() {
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });

    this.fecha = {
      year: fecha.getFullYear(),
      month: month,
    };
  }

  getAppointmentsDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.appointmentDetail = data.payload;

        this.userId = this.appointmentDetail.patientDetails.userDetails.userId;
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId);
        console.log(this.appointmentDetail);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMedicalRecord(id) {
    this.medicalRecord.getByUserId(id).subscribe(
      (data) => {
        console.log(data);
        this.exams = data.payload.exams;
        // console.log(this.exams);
        this.antecedentesGeneral = data.payload.antecedent;
        this.antecedentes = data.payload.antecedent.sickness;
        // console.log(data.antecedent);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointmentsTimeline() {
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      (data) => {
        this.timeline = data.payload;

        console.log(this.timeline);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //getVerifiedSibrareDocuments
  getVerifiedSibrareDocuments2(appointmentId) {
    this.appointmentsService.getVerifiedSibrareDocuments(appointmentId).subscribe(
      (data) => {
        console.log(data);
        this.arrayDocuments = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadSibrare(documentId) {
    this.spinner.show();
    this.descargar = true;
    console.log(documentId);
    this.getSibrareDocuments(this.idConsulta, documentId);
  }

  // get documents sibrare
  getSibrareDocuments(id, documentId) {
    this.appointmentsService.getSibrareDocumentUrl(id, documentId).subscribe(
      (data) => {
        this.urlSibrare = data.payload[0].documento;
        this.spinner.hide();
        if(this.descargar === true){     
          return  window.open(this.urlSibrare);
        }else{
          console.log(this.urlSibrare);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


}

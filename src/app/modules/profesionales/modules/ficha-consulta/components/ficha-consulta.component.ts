import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../services/appointments.service';
import { MedicalRecordService } from './../../../../../services/medicalRecord.service';
import { DocumentService } from './../../../../../services/document.service';
import { environment } from './../../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ficha-consulta',
  templateUrl: './ficha-consulta.component.html',
  styleUrls: ['./ficha-consulta.component.scss'],
})
export class FichaConsultaComponent implements OnInit {
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
  public descargar: any;

  public sicknessByProfessional: any;
  public allergiesByProfessional: any;
  public surgicalInterventionsByProfessional: any;
  public familiarHistoryByProfessional: any;
  public healthHabitsByProfessional: any;
  public medicinesByProfessional: any;
  public occupationalByProfessional: any;
  public othersByProfessional: any;

  constructor(
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService: AppointmentsService,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService
  ) {}
  tomorrow = new Date(2020, 9, 20, 14, 34);

  ngOnInit(): void {
    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();

    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      this.appointmentId = id;
      console.log(params);
      this.getAppointmentsDetails(id);
      this.getVerifiedSibrareDocuments2(id);
      this.getAntecedentByProfessional(id);
    });
    this.getAppointmentsTimeline();
    this.getFecha();
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

  getAntecedentByProfessional(appointmentId) {
    this.appointmentsService.getAntecedentByProfessional(appointmentId).subscribe(
      (data) => {
        console.log(data);
        this.sicknessByProfessional = data.payload.sickness;
        this.allergiesByProfessional = data.payload.allergies;
        this.surgicalInterventionsByProfessional = data.payload.surgicalInterventions;
        this.familiarHistoryByProfessional = data.payload.familiarHistory;
        this.healthHabitsByProfessional = data.payload.healthHabits;
        this.medicinesByProfessional = data.payload.medicines;
        this.occupationalByProfessional = data.payload.occupational;
        this.othersByProfessional = data.payload.others;
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
    this.getSibrareDocuments(this.appointmentId, documentId);
  }

  // get documents sibrare
  getSibrareDocuments(id, documentId) {
    this.appointmentsService.getSibrareDocumentUrl(id, documentId).subscribe(
      (data) => {
        this.urlSibrare = data.payload[0].documento;
        this.spinner.hide();
        if (this.descargar === true) {
          return window.open(this.urlSibrare);
        } else {
          console.log(this.urlSibrare);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

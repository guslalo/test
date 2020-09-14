import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../services/appointments.service';
import { MedicalRecordService } from './../../../../../services/medicalRecord.service';

@Component({
  selector: 'app-ficha-consulta',
  templateUrl: './ficha-consulta.component.html',
  styleUrls: ['./ficha-consulta.component.scss'],
})
export class FichaConsultaComponent implements OnInit {

  public appointmentDetail:any;
  public access_token: any;
  public downloadUrl:any;
  public user: any;
  public userId: any;
  public timeline: any;
  public fecha:any;
  public professionalData:any;
  public appointmentId:any;
  public url:string;
  public antecedentes: any;
  public antecedentesGeneral: any;
  public exams: any;


  constructor(
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService:AppointmentsService
  ) {}
  tomorrow = new Date(2020, 9, 20, 14, 34);

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params.appointmentId
      console.log(params);
      this.getAppointmentsDetails(id);

    });
    this.getAppointmentsTimeline();
    this. getFecha();

  }
  getFecha(){
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });

    this.fecha = {
      year: fecha.getFullYear(),
      month: month
    }

    //console.log(currentMonth);
  }


  getAppointmentsDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.professionalDetails.userDetails[0].userId;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId)
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

  getAppointmentsTimeline(){
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      data => { 
        this.timeline = data.payload;
     
        console.log(this.timeline)
      },
      error => {
        console.log(error)
      }
    )
  }



  
}
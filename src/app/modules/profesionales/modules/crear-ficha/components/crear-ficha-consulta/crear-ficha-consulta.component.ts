import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-crear-ficha-consulta',
  templateUrl: './crear-ficha-consulta.component.html',
  styleUrls: ['./crear-ficha-consulta.component.scss'],
})

export class CrearFichaConsultaComponent implements OnInit {

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
  public signos: FormGroup;
  public otros: FormGroup;
  public consultasForm: FormGroup;
  public diagnostico: FormGroup;
  public notes: FormGroup;
  public nutricion: FormGroup;
  public permisoGuardar:boolean;
  public fotoUser:any;
  public notesArray:any;
  public jitsiGlobal:any;

  constructor( 
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService:AppointmentsService,
    private documentService: DocumentService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.permisoGuardar = false;
    this.route.params.subscribe((params) => {
      const id = params.appointmentId
      this.appointmentId = params.appointmentId;
      console.log(params);
      this.getAppointmentsDetails(id);
      this.getAppointmentsProfessionalData(id);
      this.getAppointmentsTimeline(id);  
    });

    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext,
      JSON.parse(localStorage.getItem('currentUser')).role
    );

    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();
    this.getFecha();

    this.signos = this._formBuilder.group({
      PAS: ['',],
      PAD: ['',],
      PAmedia: ['',],
      FC: ['',],
      FR: ['',],
      Temp: ['',],
      Sat: ['',],
    });

    this.otros = this._formBuilder.group({
      physicalExam: ['',],
      examHighlights: ['',],
      plan: ['',]
    });

    this.nutricion = this._formBuilder.group({      
      weight: ['',],
      height: ['',],
      imc: ['',],
      imcClassification: ['',],  
    });

    this.consultasForm = this._formBuilder.group({
      objective: ['',],
      anamnesis: ['',]
    });

    this.diagnostico = this._formBuilder.group({
      diagnostic: ['', Validators.required],
      type: ['', Validators.required],
      comments: ['', Validators.required]
    });

    this.notes = this._formBuilder.group({
      notes: ['',]
    });
  }

  //update appointmentDetails
  putAppointment(appointmentId){
    console.log(this.signos);
    let appointmentObject = {
      patientDetails : {
         vitalSigns: this.signos.value,
         nutritionalState: this.nutricion.value,
      },
      appointmentDetails:{
        diagnosticDetails:{
          type: this.diagnostico.controls.type.value,
          diagnostic: this.diagnostico.controls.diagnostic.value,
          comments: this.diagnostico.controls.comments.value
        },
        objective:this.consultasForm.controls.objective.value,
        anamnesis:this.consultasForm.controls.anamnesis.value, 
        physicalExam: this.otros.controls.physicalExam.value,
        examHighlights: this.otros.controls.examHighlights.value,
        plan: this.otros.controls.plan.value,
      }  
    }
    console.log(appointmentObject );
    this.appointmentsService.putAppointment(appointmentId, appointmentObject).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  //update appointmentDetails
  putNotes(appointmentId){
    console.log( this.notes.controls.notes.value);
    let appointmentObject = {
      appointmentDetails:{
        notes:this.notes.controls.notes.value,
      }  
    }
    this.appointmentsService.putAppointment(appointmentId, appointmentObject).subscribe(
      data => {
        console.log(data);
        this.appointmentsService.getAppointmentsDetails(appointmentId).subscribe(
          data=> {
            console.log(data.payload.appointmentDetails.notes);
            this.notesArray = data.payload.appointmentDetails.notes;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    )
  }

  getMedicalRecord(id) {
    this.medicalRecord.getByUserId(id).subscribe(
      (data) => {
        console.log(data);
        this.exams = data.payload.exams;
        this.antecedentesGeneral = data.payload.antecedent;
        this.antecedentes = data.payload.antecedent.sickness;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSession(id: string) {
    this.appointmentsService.getAppointmentsSession(id).subscribe(
      (data) => {
        console.log(data);
        this.url = data.payload.urlRoom;
        const options = {
          roomName: data.payload.sessionId,
          jwt: data.payload.sessionToken,
          height: 500,
          //width:'auto',
          parentNode: document.querySelector('#meet'),
        };   
        this.url = data.payload.urlRoom.split('//');
        this.jitsiGlobal = new (window as any).JitsiMeetExternalAPI(this.url[1].replace('/', ''), options);
        this.jitsiGlobal.executeCommand('subject', 'Consulta');
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFecha(){
    const fecha = new Date();
    fecha.getFullYear();
    const month = fecha.toLocaleString('default', { month: 'long' });
    this.fecha = {
      year: fecha.getFullYear(),
      month: month
    }
  }

  getAppointmentsTimeline(id){
    this.appointmentsService.getAppointmentsTimelineMilestone(id).subscribe(
      data => { 
        this.timeline = data.payload; 
        console.log(this.timeline)
      },
      error => {
        console.log(error)
      }
    )
  }

  runAppointment(appointmentId, event){
    this.appointmentsService.postEventAppointment(appointmentId, event).subscribe(
      data => {
        console.log(data);
        this.getAppointmentsDetails(appointmentId);
      },
      error => {
        console.log(error);
      }
    )
  }

  endTeleconsultation(appointmentId, event){
    $("#meet").remove();
    /*this.jitsiGlobal.excutecommnad( 'hangup');
    this.jitsiGlobal.dispose();*/
    //$("#meet").remove();
    this.appointmentsService.postEventAppointment(appointmentId, event).subscribe(
      data => {
        console.log(data);
        this.getAppointmentsDetailsRefresh(appointmentId);
      },
      error => {
        console.log(error);
      }
    )
  }
    
  finish(appointmentId, event){
    this.appointmentsService.postEventAppointment(appointmentId, event).subscribe(
      data => {
        console.log(data);
        this.getAppointmentsDetails(appointmentId);
        this.router.navigate(['/app-professional']);
      },
      error => {
        console.log(error);
      }
    )
  }

  getAppointmentsProfessionalData(id){
    this.appointmentsService.getAppointmentsProfessionalData(id).subscribe(
      data => { 
        this.professionalData = data.payload;
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  getAppointmentsDetails(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo
        this.notesArray = data.payload.appointmentDetails.notes;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId)
        console.log(this.appointmentDetail);
        if(
          this.appointmentDetail.administrativeDetails.status === "running" 
          ){
            this.getSession(id);
          this.permisoGuardar = true;
        }
        if(this.appointmentDetail.administrativeDetails.status === "pending"){
          this.permisoGuardar = true;
        }
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointmentsDetailsRefresh(id) {
    this.appointmentsService.getAppointmentsDetails(id).subscribe(
      (data) => {
        this.appointmentDetail = data.payload;
        this.userId = this.appointmentDetail.patientDetails.userDetails.userId
        this.fotoUser = this.appointmentDetail.patientDetails.userDetails.photo
        this.notesArray = data.payload.appointmentDetails.notes;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId)
        console.log(this.appointmentDetail);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}

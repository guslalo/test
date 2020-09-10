import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';



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
  public consultasForm: FormGroup;
  public diagnostico: FormGroup;
  public notes: FormGroup;
  public permisoGuardar:boolean;

  constructor( 
    private route: ActivatedRoute,
    private medicalRecord: MedicalRecordService,
    private appointmentsService:AppointmentsService,
    private documentService: DocumentService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.permisoGuardar = false;
    this.route.params.subscribe((params) => {
      const id = params.appointmentId
      this.appointmentId = params.appointmentId;
      console.log(params);
      this.getAppointmentsDetails(id);
      this.getAppointmentsProfessionalData(id);

      setTimeout(()=>{       
        //this.getSession(id);
      }, 250);
      
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

    
    this.getAppointmentsTimeline();
    this.getFecha();

    this.signos = this._formBuilder.group({
      PAS: ['',],
      PAD: ['',],
      PAmedia: ['',],
      FC: ['',],
      FR: ['',],
      Temp: ['',],
      Sat: ['',]
      /*
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],*/
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
         vitalSigns: this.signos.value
      },
      appointmentDetails:{
        diagnosticDetails:{
          type: this.diagnostico.controls.type.value,
          diagnostic: this.diagnostico.controls.diagnostic.value,
          comments: this.diagnostico.controls.comments.value
        },
        objective:this.consultasForm.controls.objective.value,
        anamnesis:this.consultasForm.controls.anamnesis.value, 
        notes:this.notes.controls.notes.value
        
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



  getSession(id: string) {
    this.appointmentsService.getAppointmentsSession(id).subscribe(
      (data) => {
        console.log(data);
        this.url = data.payload.urlRoom;
        const options = {
          roomName: data.payload.sessionId,
          jwt: data.payload.sessionToken,
          height: 700,
          parentNode: document.querySelector('#meet'),
        };   
        this.url = data.payload.urlRoom.split('//');
        const jitsi = new (window as any).JitsiMeetExternalAPI(this.url[1].replace('/', ''), options);
        jitsi.executeCommand('subject', 'Consulta');
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

    //console.log(currentMonth);
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
        this.userId = this.appointmentDetail.professionalDetails.userDetails[0].userId;
        this.getMedicalRecord(this.appointmentDetail.patientDetails.userDetails.userId)
        console.log(this.appointmentDetail);
        if(
          this.appointmentDetail.administrativeDetails.status === "running"
          ){
            this.getSession(id);
          this.permisoGuardar = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



}

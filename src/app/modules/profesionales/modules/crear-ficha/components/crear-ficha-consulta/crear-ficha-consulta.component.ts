import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { DocumentService } from './../../../../../../services/document.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';



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
  public timeline: any;
  public fecha:any;
  public professionalData:any;
  public appointmentId:any;

  constructor( 
    private route: ActivatedRoute,
    private appointmentsService:AppointmentsService,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      const id = params.appointmentId
      this.appointmentId = params.appointmentId;
      console.log(params);
      this.getAppointmentsDetails(id);
      this.getAppointmentsProfessionalData(id);
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
        this.appointmentDetail = data.payload[0];
        console.log(this.appointmentDetail);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}

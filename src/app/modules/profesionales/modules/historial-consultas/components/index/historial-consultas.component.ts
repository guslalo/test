import { Component, HostListener, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentEventsService } from './../../../../../../services/appointment-events.service';
import { environment } from 'src/environments/environment';

const states = ['test', 'test3', 'test4'];

@Component({
  selector: 'app-historial-consultas',
  templateUrl: './historial-consultas.component.html',
  styleUrls: ['./historial-consultas.component.scss'],
})
export class HistorialConsultasComponent implements OnInit {
  @HostListener('click', ['$event.target']) 
  onClick(e) {
    this.appointmentsEvents.enableCheckDatesEnableButtons(this.consultas)
  }
  
  public model: any;
  public consultas: any;
  model2: NgbDateStruct;
  public timeline: any;
  public fecha: any;
  public page: number = 1;
  public totalPages: number;
  public setup: string;

  constructor(private appointmentsService: AppointmentsService, private appointmentsEvents: AppointmentEventsService) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  ngOnInit(): void {
    this.setup = environment.setup;
    this.page = 1;
    this.getAppointments();
    this.getFecha();
    this.getAppointmentsTimeline();
    this.appointmentsService.getTotalPages().subscribe((data) => {
      console.log(data);
      //this.totalPages = 3;
      //this.totalPages = data.payload.numberOfPages;
    });
  }

  ngAfterViewInit() {
    let _user = JSON.parse(localStorage.getItem('currentUser'))
    let _userId = _user.id
    this.appointmentsEvents.getSpecialtiesForProfessional$.emit(_userId)
    this.appointmentsEvents.buildForm$.emit(_user.role)
  }

  openModalReagendamiento(item) {
    this.appointmentsEvents.setAppointmentReagendamiento$.emit(item)
    this.appointmentsEvents.getProfessionalBlocks$.emit(item)
  }

  setAppointmentCancelReasons(status){
    this.appointmentsEvents.setAppointmentCancelReasons$.emit(status)
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

  getAppointments() {
    this.appointmentsService.getAppointments(1, 'finished', 'historic').subscribe(
      (data) => {
        console.log(data);
        this.consultas = data.payload;
        this.totalPages = this.consultas.length;
        console.log(this.totalPages);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getAppointmentsTimeline() {
    this.appointmentsService.getAppointmentsTimeline().subscribe(
      (data) => {
        this.timeline = data.payload.filter((finished) => finished.status === 'finished');
        console.log(this.timeline);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

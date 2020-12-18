import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CurrentUserService } from './../../../services/current-user.service';
import { NgbModal, NgbRatingConfig, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from './../../../services/appointments.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';
import { RescheduleAppointmentComponent } from 'src/app/shared/modules/reschedule-appointment/reschedule-appointment.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioPComponent implements OnInit {
  @HostListener('click', ['$event.target']) 
  onClick(e) {
    this.appointmentsEvents.enableCheckDatesEnableButtons(this.consultas)
  }

  @ViewChild('modal') private modalContent: TemplateRef<RescheduleAppointmentComponent>
  public consultas: any;
  public currentUser: any = {};
  currentRate = 4;
  public fecha: any;
  public nextAppointed: any;
  public consultasFinalizadas: any;
  public consultasEsperas: any;
  public salas: any;

  constructor(
    private spinner: NgxSpinnerService,
    private appointmentsService: AppointmentsService,
    public currentUserService: CurrentUserService,
    public config: NgbRatingConfig,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentsEvents: AppointmentEventsService,
    private modalService: NgbModal
  ) {
    config.max = 5;
    config.readonly = true;

    /* config2.justify = 'center';
      config2.type = 'pills';*/
  }

  ngOnInit(): void {
    this.spinner.show();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAppointments();
    //this.getAppointments2();
    this.getRooms();

    this.appointmentsEvents.listAppointments$.subscribe(() => {
      this.getAppointments()
    })
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

  getAppointments() {
    this.appointmentsService.getAppointments(1).subscribe(
      (data) => {
        
        console.log('getAppointments', data);

        this.consultas = data.payload.filter((finished) => finished.administrativeDetails.status !== 'finished' && finished.administrativeDetails.status !== 'canceled');
        console.log(this.consultas);
        
        if (this.consultas.length > 0) {
          let arrayForDate = this.consultas.map((value) => value.dateDetails.date);
          var min = arrayForDate[0];

          arrayForDate.forEach((numero) => {
            if (numero < min) {
              min = numero;
            }
          });

          this.nextAppointed = this.consultas.filter((now) => now.dateDetails.date === min);
          let finalizadas = data.payload.filter((finished) => finished.administrativeDetails.status === 'finished');

          this.consultasFinalizadas = finalizadas.length;

          console.log(this.consultas);
          /*var dates = data.payload.map(function(x) { return new Date(x.dateDetails.date); });
          var latest = new Date(Math.max.apply(null,dates));
          var earliest = new Date(Math.min.apply(null,dates));*/
          this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAppointments2() {
    this.appointmentsService.getAppointments(1, 'waitingInList').subscribe(
      (data) => {
        //let finalizadas = data.payload.filter((finished) => finished.administrativeDetails.status === 'finished');
        //.consultasFinalizadas = finalizadas.length;
        // this.consultasEsperas = data.payload;
        //console.log(this.consultasEsperas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange(value) {
    console.log(value);
    this.appointmentsService.getWaitingAppointmentForRoomsId(value).subscribe(
      (data) => {
        console.log(data);
        this.consultasEsperas = data.payload.filter(x => x.canEnter === true);
        console.log(this.consultasEsperas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRooms() {
    this.appointmentsService.getWaitingRooms().subscribe(
      (data) => {
        console.log(data);
        this.salas = data.payload;
        console.log(this.salas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  atender(item) {
    this.appointmentsService.attendAppointmentInmediate(item).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['crear-ficha-consulta/' + item], { relativeTo: this.route });
        // routerLink="crear-ficha-consulta/{{ item._id }}
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../../../../../services/appointments.service';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; 
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {


  public nextAppointments = []
  public openAppointments = []
  public immediateAppointments = []
  public interval:any;
  public setup: string;

  constructor( 
    private router: Router,
    public appointmentsService: AppointmentsService,
    private appointmentsEvents: AppointmentEventsService
  ) { 

  }

  ngOnInit(): void {
    this.setup = environment.setup;
    this.getAppointmentsForTypes();
    this.intervalFunction();
    this.router.events.subscribe(value => {
      clearInterval(this.interval);
    });
    
  }

  intervalFunction(){
    setTimeout(() => {
      this.interval = setInterval(() => {
        this.getAppointmentsForTypes();
       }, 10000);
    }, 0);
  }


  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  retryTimer(){
    this.intervalFunction()
  }
  
  filterTable(event) {
    clearInterval(this.interval);
    console.log(event)
    var input, filter, table, tr, td, td1, i, txtValue;
    input = document.getElementById(event);
    filter = input.value.toUpperCase();
    table = document.getElementById(event + 'Table');
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      td1 = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } 
        else {
          if (td1.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAppointmentsForTypes() {
    this.appointmentsService.getAppointmentsForTypes().subscribe(
      (data) => {
        console.log(data)
        
        this.openAppointments = data.payload.openAppointments
        this.immediateAppointments = data.payload.immediateAppointments
        this.nextAppointments = data.payload.nextAppointments
        console.log( this.nextAppointments)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModalReagendamiento(item) {
    this.appointmentsEvents.setAppointmentReagendamiento$.emit(item)
    this.appointmentsEvents.getProfessionalBlocks$.emit(item)
  }

  setAppointmentCancelReasons(status){
    this.appointmentsEvents.setAppointmentCancelReasons$.emit(status)
  }

  quitAsignation(item){
    this.appointmentsService.postQuitAsignation(item._id).subscribe(
      (data)=>{
        this.getAppointmentsForTypes()
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  /*
  setAppointmentCancelReasons(row){
    this.appointmentsEvents.setAppointmentCancelReasons$.emit(row)
  }

  openModalReagendamiento(item) {
    this.appointmentsEvents.setAppointmentReagendamiento$.emit(item)
    this.appointmentsEvents.getProfessionalBlocks$.emit(item)
  }*/


}

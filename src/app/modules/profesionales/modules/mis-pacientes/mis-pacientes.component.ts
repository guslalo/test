import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from 'src/app/services/patients.service';
// import { NgbdPaginationBasic } from './pagination-basic';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {
  patients: any[] = [];
  temp: any[] = [];
  searchTerm: string = '';

  page = 1;
  pageSize = 7;

  constructor(private patientService: PatientsService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients() {
    this.patientService.getPatientsForProfesional().subscribe(
      (data) => {
        console.log(data);
        this.temp = [...data.payload];
        this.patients = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

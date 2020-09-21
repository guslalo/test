import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public patients = [];
  public tempPatients = [];
  public photoUrlBase = 'https://itms-dev.s3-sa-east-1.amazonaws.com/';

  moment: any = moment;

  ColumnMode = ColumnMode;

  searchTerm: string = '';

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientsService.getAllPatients().subscribe(
      (data) => {
        console.log(data);
        this.tempPatients = [...data];
        this.patients = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilters() {
    const searchTerm = this.searchTerm.toLowerCase();
    var temp = [];

    temp = this.tempPatients
      // SEARCH FILTER
      .filter((patient) => {
        // console.log(patient);
        return (
          (patient.identificationData.cpf?.toLowerCase().indexOf(searchTerm) ||
            patient.identificationData.cns?.toLowerCase().indexOf(searchTerm) ||
            patient.identificationData.rgRegistry?.toLowerCase().indexOf(searchTerm) ||
            patient.identificationData.passport?.toLowerCase().indexOf(searchTerm)) !== -1 ||
          patient.personalData.name.toLowerCase().indexOf(searchTerm) !== -1 ||
          patient.personalData.lastName.toLowerCase().indexOf(searchTerm) !== -1 ||
          patient.personalData.phoneNumber.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      });
    this.patients = temp;

    // console.log(temp);
  }
}

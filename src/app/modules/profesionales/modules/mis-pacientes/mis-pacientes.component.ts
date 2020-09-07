import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CurrentUserService } from 'src/app/services/current-user.service';
// import { NgbdPaginationBasic } from './pagination-basic';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {
  patients: any[] = [];
  prePatients: any[] = [];
  temp: any[] = [];
  searchTerm: string = '';

  tab: any = 'patients';
  page = 1;
  pageSize = 7;
  moment: any = moment;
  patientIsEdit: boolean = false;
  emailSent: boolean = false;

  ColumnMode = ColumnMode;
  patientForm: FormGroup;

  constructor(
    private patientService: PatientsService,
    private formBuilder: FormBuilder,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    // console.log(this.currentUserService.currentUser);

    this.fetchPatients();
    this.fetchPrePatients();

    this.patientForm = this.formBuilder.group({
      isTutor: [false],
      name: ['test', Validators.required],
      lastName: ['test', Validators.required],
      secondLastName: ['test', Validators.required],
      phoneNumber: [123, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      email: ['a@a.cl', [Validators.email, Validators.required]],
      gender: ['male', Validators.required],
      age: [25, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(120)]],
    });
  }

  fetchPatients() {
    this.patientService.getPatientsForProfesional().subscribe(
      (data) => {
        // console.log(data);
        // NO PATIENTS FOUND
        if (Array.isArray(data.payload)) {
          this.temp = [...data.payload];
          this.patients = data.payload;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchPrePatients() {
    this.patientService.getPrePatientsForProfesional().subscribe(
      (data) => {
        console.log(data);
        // NO PATIENTS FOUND
        if (Array.isArray(data.payload)) {
          this.temp = [...data.payload];
          this.prePatients = data.payload;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  savePatient() {
    console.log(this.patientForm.value);

    try {
      const patientObject = {
        isTutor: this.patientForm.value.isTutor,
        name: this.patientForm.value.name,
        lastName: this.patientForm.value.lastName,
        secondLastName: this.patientForm.value.secondLastName,
        gender: this.patientForm.value.gender,
        phoneNumber: this.patientForm.value.phoneNumber,
        email: this.patientForm.value.email,
        age: this.patientForm.value.age,
        professionalAssigned: this.currentUserService.currentUser.id,
      };
      this.patientService.createPrePatient(patientObject).subscribe(
        (error) => {
          console.log(error);
        },
        () => {
          console.log('patient created');
        }
      );
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      this.fetchPrePatients();
    }, 1000);
  }

  sendInvitationEmail(patientId) {
    this.emailSent = false;
    this.patientService.sendInvitationEmail(patientId).subscribe(
      () => {
        this.emailSent = true;
      },
      (error) => console.log(error)
    );
  }
}

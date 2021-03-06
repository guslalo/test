import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
// import { NgbdPaginationBasic } from './pagination-basic';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss'],
})
export class MisPacientesComponent implements OnInit {
  patients: any[] = [];
  prePatients: any[] = [];
  tempPatients: any[] = [];
  tempPrePatients: any[] = [];
  searchTerm: string = '';

  tab: any = '1';
  page = 1;
  pageSize = 20;
  moment: any = moment;
  patientIsEdit: boolean = false;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selectedPrePatients = [];
  patientForm: FormGroup;
  setup: string;
  constructor(
    private patientService: PatientsService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.getItem('currentUser'));
    this.setup = environment.setup;
    this.fetchPatients();
    this.fetchPrePatients();

    this.patientForm = this.formBuilder.group({
      isTutor: [false],
      name: ['', Validators.required],
      lastName: ['',],
      secondLastName: ['', Validators.required],
      phoneNumber: [null, [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      gender: ['male', Validators.required],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(120)]],
    });
  }

  calcularEdad(dateString) {

    if (!dateString) return

    let separa = dateString.split("/");
    let separaAno = separa[2]
    let today = new Date();

    let _age: any

    if (separaAno.split("").length === 4) {
      _age = today.getFullYear() - separa[2]
    } else {
      _age = today.getFullYear() - separa[0]
    }
    return _age;
  };

  fetchPatients() {
    this.patientService.getPatientsForProfesional().subscribe(
      (data) => {
        console.log(data);
        // NO PATIENTS FOUND
        if (Array.isArray(data.payload)) {
          this.tempPatients = [...data.payload];
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
          this.tempPrePatients = [...data.payload];
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
        professionalAssigned: JSON.parse(localStorage.getItem('currentUser')).id,
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

  sendInvitationEmail(userId?: string) {
    if (this.selectedPrePatients.length) {
      const usersToInvite = this.prePatients
        .filter((u) => {
          if (u.status === 'joined') return u;
        })
        .map((u) => u._id);

      const validUsers = [];
      for (var i in usersToInvite) {
        // MATCH ID
        if (this.selectedPrePatients.map((u) => u._id).indexOf(usersToInvite[i]) !== -1) {
          validUsers.push(usersToInvite[i]);
        }
      }

      console.log(validUsers);
      this.patientService.sendInvitationEmail(validUsers).subscribe();
      this.toastService.success('Invitations Sent', 'Success');
    } else {
      this.selectedPrePatients = [];
      this.selectedPrePatients.push(userId);
      this.patientService.sendInvitationEmail(this.selectedPrePatients).subscribe();
      console.log('sent');
      this.toastService.success('Invitation Sent', 'Success');
    }
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedPrePatients);
    this.selectedPrePatients.splice(0, this.selectedPrePatients.length);
    this.selectedPrePatients.push(...selected);
  }

  applyFilters(tab: string) {
    const searchTerm = this.searchTerm.toLowerCase();
    var temp = [];
    if (this.tempPatients) {
      if (tab === '1') {
        temp = this.tempPatients
          // SEARCH FILTER
          .filter((patient) => {
            // console.log(patient);
            let viewName = patient.personalData.name + ' ' + (patient.personalData.secondLastName || patient.personalData.lastName)
            if (viewName.toLowerCase().includes(searchTerm)) console.log(viewName)
            return (
              patient.identificationData.cpf?.toLowerCase().includes(searchTerm) ||
              patient.identificationData.cns?.toLowerCase().includes(searchTerm) ||
              patient.identificationData.rgRegistry?.toLowerCase().includes(searchTerm) ||
              patient.identificationData.passport?.toLowerCase().includes(searchTerm) ||
              viewName.toLowerCase().includes(searchTerm) ||
              patient.personalData.phoneNumber?.toString().toLowerCase().includes(searchTerm) ||
              !searchTerm
            );
          });
        console.log(temp)
        this.patients = temp;
      }
    }

    if (tab === '2') {
      temp = this.tempPrePatients
        // SEARCH FILTER
        .filter((patient) => {
          let viewName = patient.name + ' ' + (patient.secondLastName || patient.lastName)
          if (viewName.toLowerCase().includes(searchTerm)) console.log(viewName)
          return (
            viewName.toString().toLowerCase().includes(searchTerm) ||
            patient.secondLastName?.toLowerCase().includes(searchTerm) ||
            patient.email?.toLowerCase().includes(searchTerm) ||
            patient.phoneNumber?.toString().toLowerCase().includes(searchTerm) ||
            !searchTerm
          );
        });
      this.prePatients = temp;
    }

    // console.log(temp);
  }
}

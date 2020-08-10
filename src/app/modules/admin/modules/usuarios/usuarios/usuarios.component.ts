import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

const states = ['1', '2', '3'];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  tab = 'admins';

  patientForm: FormGroup;

  name = 'Angular';
  page = 1;
  pageSize = 7;
  users = [];
  edited = 'false';

  patientObject: any = {};

  constructor(private formBuilder: FormBuilder, public adminService: AdminService) {}

  ngOnInit(): void {
    //this.user = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.UserLogin);
    this.patientForm = this.formBuilder.group({
      isTutor: [false],
      name: ['test', Validators.required],
      lastName: ['test', Validators.required],
      phoneNumber: ['123', Validators.required],
      email: ['patient_front@mail.com', [Validators.email, Validators.required]],
      genre: ['masculino', Validators.required],
      idDocumentNumber: ['123', Validators.required],
    });

    this.getUsers();
  }

  createPatient() {
    console.log(this.patientForm.value);

    this.patientObject = {
      personalData: {
        name: this.patientForm.value.name,
        lastName: this.patientForm.value.lastName,
        phoneNumber: this.patientForm.value.phoneNumber,
        email: this.patientForm.value.email,
        genre: this.patientForm.value.genre,
      },
      identificationData: {
        idDocumentNumber: this.patientForm.value.idDocumentNumber,
      },
      isTutor: this.patientForm.value.isTutor,
    };

    this.adminService.createUser('patient', this.patientObject).subscribe((response) => {
      // console.log(response);
      // this.router.navigate(['app-admin/usuarios']);
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  getUsers() {
    this.adminService.getUsers('admins').subscribe(
      (data) => {
        // console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeTab(userType: string) {
    this.adminService.getUsers(userType).subscribe(
      (data) => {
        // console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

const states = ['1', '2', '3'];

declare var $;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  tab = 'admins';

  @ViewChild('patientModal') patientModal: ElementRef;
  patientForm: FormGroup;

  name = 'Angular';
  page = 1;
  pageSize = 7;
  users = [];
  isEdit: boolean = false;

  patientId: string;
  patientObject: any = {};

  constructor(private formBuilder: FormBuilder, public adminService: AdminService, private el: Renderer2) {}

  ngOnInit(): void {
    //this.user = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.UserLogin);
    this.patientForm = this.formBuilder.group({
      isTutor: [true],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      genre: ['', Validators.required],
      idDocumentNumber: ['', Validators.required],
    });

    this.getUsers('admins');
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  getUsers(role) {
    this.adminService.getUsers(role).subscribe(
      (data) => {
        // console.log(data);
        this.users = data.reverse();
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
        this.users = data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModal(action, userId = null) {
    if (action === 'create') {
      this.isEdit = false;
      this.patientForm.reset();
    } else if (action === 'update') {
      this.isEdit = true;
      this.getPatient(userId);
    }
    $(this.patientModal.nativeElement).modal('show');
  }

  getPatient(userId) {
    this.adminService.getUserById('patients', userId).subscribe((data) => {
      this.patientId = data.id;
      this.patientForm.get('isTutor').setValue(data.isTutor || false);
      this.patientForm.get('name').setValue(data.personalData.name);
      this.patientForm.get('lastName').setValue(data.personalData.lastName);
      this.patientForm.get('genre').setValue(data.personalData.genre);
      this.patientForm.get('email').setValue(data.personalData.email);
      this.patientForm.get('phoneNumber').setValue(data.personalData.phoneNumber);
      this.patientForm.get('idDocumentNumber').setValue(data.identificationData.idDocumentNumber);
    });
  }

  async savePatient() {
    console.log(this.patientForm.value);

    this.patientObject = {
      id: this.patientId,
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

    if (!this.isEdit) {
      this.adminService.createUser('patient', this.patientObject).subscribe();
    } else {
      this.adminService.updateUser('patients', this.patientObject).subscribe();
    }
    setTimeout(() => {
      this.getUsers('patients');
    }, 1000);
  }
}

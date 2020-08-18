import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { FileSaver } from 'file-saver';
import * as XLSX from 'xlsx';

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

  users: any[] = [];
  temp: any[] = [];
  selected = [];
  profiles: any[] = [];
  profileSelected: string = null;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  isEdit: boolean = false;
  emailSent: boolean = false;

  userId: string;
  patientId: string;
  patientObject: any = {};

  constructor(private formBuilder: FormBuilder, public adminService: AdminService, private modalService: NgbModal) {}

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.UserLogin);
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
    this.getProfiles('admin');
  }

  getUsers(role) {
    this.users = [];
    this.selected = [];
    this.adminService.getUsers(role).subscribe(
      (data) => {
        // console.log(data);
        this.temp = [...data.reverse()];
        this.users = data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProfiles(userType) {
    this.adminService.getProfiles().subscribe(
      (data) => {
        this.profiles = data.filter((profile) => {
          if (profile.role === userType) {
            return profile;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeTab(userType: string) {
    this.users = [];
    this.selected = [];
    this.adminService.getUsers(userType).subscribe(
      (data) => {
        // console.log(data);
        this.temp = [...data.reverse()];
        this.users = data.reverse();
        this.getProfiles(userType.slice(0, -1));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openPatientModal(action, userId = null) {
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

  openDeactivateUserModal(disableUserModal, userId: string) {
    this.userId = userId;
    this.modalService.open(disableUserModal);
  }

  openSendInvitationModal(sendInvitationModal, userId: string) {
    this.userId = userId;
    this.modalService.open(sendInvitationModal);
  }

  deactivateUser() {
    this.adminService.deactivateUser(this.userId).subscribe();
  }

  sendInvitationEmail() {
    this.adminService.sendInvitationEmail(this.userId).subscribe(() => {
      this.emailSent = true;
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  search(event) {
    const val = event.target.value.toLowerCase();
    // console.log(val);
    const temp = this.temp.filter(function (u) {
      return (
        u.nationalId.toLowerCase().indexOf(val) !== -1 ||
        u.fullName.toLowerCase().indexOf(val) !== -1 ||
        u.email.toLowerCase().indexOf(val) !== -1 ||
        u.phone.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.users = temp;
  }

  filterByProfile() {
    let value = this.profileSelected;

    const temp = this.temp.filter(function (u) {
      if (value) {
        if (u.profiles.includes(value)) {
          return u;
        }
      } else {
        return u;
      }
    });
    this.users = temp;
  }

  exportAsExcelFile() {
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(this.selected);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    XLSX.writeFile(workBook, 'usuarios_planilla.xlsx'); // initiate a file download in browser
  }
}

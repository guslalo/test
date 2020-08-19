import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { FileSaver } from 'file-saver';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

declare var $;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  role = this.routerAct.snapshot.queryParamMap.get('role');
  profile = this.routerAct.snapshot.queryParamMap.get('profile');

  @ViewChild('patientModal') patientModal: ElementRef;
  patientForm: FormGroup;

  users: any[] = [];
  temp: any[] = [];
  selected = [];
  profiles: any[] = [];
  searchTerm: string = '';
  profileSelected: string = null;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  isEdit: boolean = false;
  emailSent: boolean = false;

  userId: string;
  patientId: string;
  patientObject: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private routerAct: ActivatedRoute,
    public adminService: AdminService,
    private modalService: NgbModal,
    private el: Renderer2
  ) {}

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      isTutor: [true],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      genre: ['', Validators.required],
      idDocumentNumber: ['', Validators.required],
    });

    if (this.role && this.profile) {
      this.profileSelected = this.profile;
      switch (this.role) {
        case 'admin':
          const tab_adm = <HTMLInputElement>document.querySelector('#admin-tab');
          this.el.removeClass(tab_adm, 'active');
          this.el.addClass(tab_adm, 'active');
          this.getUsers('admins');
          this.getProfiles('admin');
          break;

        case 'coordinator':
          const tab_coor = <HTMLInputElement>document.querySelector('#coordinator-tab');
          this.el.removeClass(tab_coor, 'active');
          this.el.addClass(tab_coor, 'active');
          this.getUsers('coordinators');
          this.getProfiles('coordinator');
          break;

        case 'professional':
          const tab_pro = <HTMLInputElement>document.querySelector('#professional-tab');
          this.el.removeClass(tab_pro, 'active');
          this.el.addClass(tab_pro, 'active');
          this.getUsers('professionals');
          this.getProfiles('professional');
          break;
      }

      setTimeout(() => {
        this.applyFilters();
      }, 500);
    } else {
      const tab_adm = <HTMLInputElement>document.querySelector('#admin-tab');
      this.el.addClass(tab_adm, 'active');
      this.getUsers('admins');
      this.getProfiles('admin');
    }
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

  applyFilters() {
    const profile = this.profileSelected;
    const searchTerm = this.searchTerm.toLowerCase();

    const temp = this.temp
      // PROFILE FILTER
      .filter((user) => {
        if (profile) {
          if (user.profiles.includes(profile)) {
            return user;
          }
        } else {
          return user;
        }
      })
      // SEARCH FILTER
      .filter((user) => {
        return (
          user.nationalId.toLowerCase().indexOf(searchTerm) !== -1 ||
          user.fullName.toLowerCase().indexOf(searchTerm) !== -1 ||
          user.email.toLowerCase().indexOf(searchTerm) !== -1 ||
          user.phone.toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      });

    this.users = temp;
  }

  exportAsExcelFile() {
    // FORMAT DATA
    const xlsx_users = this.selected.map((user) => ({
      ID: user.nationalId,
      Nombre: user.fullName,
      Correo: user.email,
      Telefono: user.phone,
      Estado: user.status,
    }));
    const workBook = XLSX.utils.book_new();
    workBook.SheetNames.push('export_1');
    const workSheet = XLSX.utils.json_to_sheet(xlsx_users);
    // SET COLUMNS SIZE
    var wscols = [{ wch: 10 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 10 }];
    workSheet['!cols'] = wscols;
    workBook.Sheets['export_1'] = workSheet;
    // CREATE AND DOWNLOAD DOCUMENT
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
    XLSX.writeFile(workBook, 'usuarios_planilla.xlsx');
  }
}

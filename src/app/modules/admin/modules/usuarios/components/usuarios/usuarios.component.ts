import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
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
  pageSize: number = 10;
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
        console.log(data);
        this.temp = [...data.filter((user) => !user.isDeleted).reverse()];
        this.users = data.filter((user) => !user.isDeleted).reverse();
        // console.log(this.users);
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
        this.temp = [...data.filter((user) => !user.isDeleted).reverse()];
        this.users = data.filter((user) => !user.isDeleted).reverse();
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

  openDeactivateUserModal(disableUserModal, userId: string) {
    this.userId = userId;
    this.modalService.open(disableUserModal);
  }

  openSendInvitationModal(sendInvitationModal, userId: string) {
    this.userId = userId;
    this.modalService.open(sendInvitationModal);
  }

  changeUserStatus(userId, status, role) {
    // console.log(userId, status, role);
    this.adminService.changeUserStatus(userId, status).subscribe(() => {
      switch (role) {
        case 'admins':
          this.getUsers('admins');
          break;

        case 'coordinators':
          this.getUsers('coordinators');
          break;

        case 'professionals':
          this.getUsers('professionals');
          break;

        case 'patients':
          this.getUsers('patients');
          break;
      }
    });
  }

  sendInvitationEmail() {
    if (this.selected.length) {
      const usersToInvite = this.users
        .filter((u) => {
          if (u.status === 'Pendiente') return u;
        })
        .map((u) => u.id);

      const validUsers = [];
      for (var i in usersToInvite) {
        // MATCH ID
        if (this.selected.map((u) => u.id).indexOf(usersToInvite[i]) !== -1) {
          validUsers.push(usersToInvite[i]);
        }
      }

      this.adminService.sendInvitationEmail(validUsers).subscribe(() => {
        this.emailSent = true;
      });
    } else {
      this.selected = [];
      this.selected.push(this.userId);
      this.adminService.sendInvitationEmail(this.selected).subscribe(() => {
        this.emailSent = true;
      });
    }
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
        console.log(user);

        return (
          user.nationalId.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          user.fullName.toLowerCase().indexOf(searchTerm) !== -1 ||
          user.email.toLowerCase().indexOf(searchTerm) !== -1 ||
          user.phone.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
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

import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import * as _ from 'lodash';
import { AdminService } from '../../../../services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss'],
})
export class CrearPerfilComponent implements OnInit {
  checkAllUserPolicies: boolean = true;
  checkAllProfilesPolicies: boolean = true;
  checkAllMedicalRecords: boolean = true;
  checkAllAppointmentsPolicies: boolean = true;
  checkAllAvailabilitiesPolicies: boolean = true;
  checkAllWaitingRoomsPolicies: boolean = true;
  checkAllClinicsPolicies: boolean = true;
  checkAllReportsPolicies: boolean = true;

  profile = new Profile();

  constructor(private adminService: AdminService, private location: Location) {}

  ngOnInit(): void {
    // console.log(this.profile);
    this.profile.role = 'admin';
  }

  setRole(value) {
    this.profile.role = value;
  }

  checkAll(policies) {
    console.log(policies);

    switch (policies) {
      case 'users':
        if (this.checkAllUserPolicies) {
          this.profile.userPolicies = _.mapValues(this.profile.userPolicies, () => true);
        } else {
          this.profile.userPolicies = _.mapValues(this.profile.userPolicies, () => false);
        }
        break;

      case 'profiles':
        if (this.checkAllProfilesPolicies) {
          this.profile.profilePolicies = _.mapValues(this.profile.profilePolicies, () => true);
        } else {
          this.profile.profilePolicies = _.mapValues(this.profile.profilePolicies, () => false);
        }
        break;

      case 'medicalRecords':
        if (this.checkAllMedicalRecords) {
          this.profile.medicalRecordPolicies = _.mapValues(this.profile.medicalRecordPolicies, () => true);
        } else {
          this.profile.medicalRecordPolicies = _.mapValues(this.profile.medicalRecordPolicies, () => false);
        }
        break;

      case 'appointments':
        if (this.checkAllAppointmentsPolicies) {
          this.profile.appointmentPolicies = _.mapValues(this.profile.appointmentPolicies, () => true);
        } else {
          this.profile.appointmentPolicies = _.mapValues(this.profile.appointmentPolicies, () => false);
        }
        break;

      case 'availabilities':
        if (this.checkAllAvailabilitiesPolicies) {
          this.profile.availabilitiesPolicies = _.mapValues(this.profile.availabilitiesPolicies, () => true);
        } else {
          this.profile.availabilitiesPolicies = _.mapValues(this.profile.availabilitiesPolicies, () => false);
        }
        break;

      case 'waitingRooms':
        if (this.checkAllWaitingRoomsPolicies) {
          this.profile.waitingRoomPolicies = _.mapValues(this.profile.waitingRoomPolicies, () => true);
        } else {
          this.profile.waitingRoomPolicies = _.mapValues(this.profile.waitingRoomPolicies, () => false);
        }
        break;

      case 'clinics':
        if (this.checkAllClinicsPolicies) {
          this.profile.clinicPolicies = _.mapValues(this.profile.clinicPolicies, () => true);
        } else {
          this.profile.clinicPolicies = _.mapValues(this.profile.clinicPolicies, () => false);
        }
        break;

      case 'reports':
        if (this.checkAllReportsPolicies) {
          this.profile.reportPolicies = _.mapValues(this.profile.reportPolicies, () => true);
        } else {
          this.profile.reportPolicies = _.mapValues(this.profile.reportPolicies, () => false);
        }
        break;
    }
  }

  crearUsuario() {
    // console.log(this.profile);

    if (this.profile.profileName !== null || this.profile.profileName !== '') {
      this.adminService.createProfile(this.profile).subscribe(() => {
        // console.log(response);
        this.location.back();
      });
    } else {
      alert('Complete el formulario con todos los datos necesarios');
    }
  }
}

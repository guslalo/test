import { Location } from '@angular/common';
import { Component, OnInit, Renderer2, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit, AfterContentChecked {
  profileId = this.routerAct.snapshot.queryParamMap.get('profileId');

  checkAllUserPolicies: boolean;
  checkAllProfilesPolicies: boolean;
  checkAllMedicalRecords: boolean;
  checkAllAppointmentsPolicies: boolean;
  checkAllAvailabilitiesPolicies: boolean;
  checkAllWaitingRoomsPolicies: boolean;
  checkAllClinicsPolicies: boolean;
  checkAllReportsPolicies: boolean;

  profile: Profile;
  profileModel = new Profile();

  formProfile: FormGroup;

  constructor(
    private routerAct: ActivatedRoute,
    private adminService: AdminService,
    private location: Location,
    private el: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formProfile = new FormGroup({
      profileName: new FormControl(null, { validators: Validators.required }),
      profileDescription: new FormControl(null),
    });

    this.profile = this.profileModel;

    this.getProfile(this.profileId);
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  setRole(value) {
    // console.log(this.profile);
    this.profile.role = value;
  }

  checkAll(policies) {
    // console.log(policies);
    switch (policies) {
      case 'users':
        if (this.checkAllUserPolicies) this.profile.userPolicies = _.mapValues(this.profile.userPolicies, () => true);
        if (!this.checkAllUserPolicies) this.profile.userPolicies = _.mapValues(this.profile.userPolicies, () => false);
        break;

      case 'profiles':
        if (this.checkAllProfilesPolicies)
          this.profile.profilePolicies = _.mapValues(this.profile.profilePolicies, () => true);
        if (!this.checkAllProfilesPolicies)
          this.profile.profilePolicies = _.mapValues(this.profile.profilePolicies, () => false);
        break;

      case 'medicalRecords':
        if (this.checkAllMedicalRecords)
          this.profile.medicalRecordPolicies = _.mapValues(this.profile.medicalRecordPolicies, () => true);
        if (!this.checkAllMedicalRecords)
          this.profile.medicalRecordPolicies = _.mapValues(this.profile.medicalRecordPolicies, () => false);
        break;

      case 'appointments':
        if (this.checkAllAppointmentsPolicies)
          this.profile.appointmentPolicies = _.mapValues(this.profile.appointmentPolicies, () => true);
        if (!this.checkAllAppointmentsPolicies)
          this.profile.appointmentPolicies = _.mapValues(this.profile.appointmentPolicies, () => false);
        break;

      case 'availabilities':
        if (this.checkAllAvailabilitiesPolicies)
          this.profile.availabilitiesPolicies = _.mapValues(this.profile.availabilitiesPolicies, () => true);
        if (!this.checkAllAvailabilitiesPolicies)
          this.profile.availabilitiesPolicies = _.mapValues(this.profile.availabilitiesPolicies, () => false);
        break;

      case 'waitingRooms':
        if (this.checkAllWaitingRoomsPolicies)
          this.profile.waitingRoomPolicies = _.mapValues(this.profile.waitingRoomPolicies, () => true);
        if (!this.checkAllWaitingRoomsPolicies)
          this.profile.waitingRoomPolicies = _.mapValues(this.profile.waitingRoomPolicies, () => false);
        break;

      case 'clinics':
        if (this.checkAllClinicsPolicies)
          this.profile.clinicPolicies = _.mapValues(this.profile.clinicPolicies, () => true);
        if (!this.checkAllClinicsPolicies)
          this.profile.clinicPolicies = _.mapValues(this.profile.clinicPolicies, () => false);
        break;

      case 'reports':
        if (this.checkAllReportsPolicies)
          this.profile.reportPolicies = _.mapValues(this.profile.reportPolicies, () => true);
        if (!this.checkAllReportsPolicies)
          this.profile.reportPolicies = _.mapValues(this.profile.reportPolicies, () => false);
        break;
    }
  }

  getProfile(profileId) {
    this.adminService.getProfileById(profileId).subscribe(
      (profileData) => {
        // console.log(profile);
        const role = profileData.role;
        this.profile = profileData;

        switch (role) {
          case 'admin':
            this.profile.medicalRecordPolicies = this.profileModel.medicalRecordPolicies;
            const tab_adm = <HTMLInputElement>document.querySelector('#admin-tab');
            this.el.removeClass(tab_adm, 'active');
            this.el.addClass(tab_adm, 'active');
            break;

          case 'coordinator':
          case 'professional':
            if (role === 'coordinator') {
              const tab_coor = <HTMLInputElement>document.querySelector('#coordinator-tab');
              this.el.removeClass(tab_coor, 'active');
              this.el.addClass(tab_coor, 'active');
            } else if (role === 'professional') {
              const tab_pro = <HTMLInputElement>document.querySelector('#professional-tab');
              this.el.removeClass(tab_pro, 'active');
              this.el.addClass(tab_pro, 'active');
            }
            this.profile.userPolicies = this.profileModel.userPolicies;
            this.profile.profilePolicies = this.profileModel.profilePolicies;
            this.profile.clinicPolicies = this.profileModel.clinicPolicies;
            break;
        }

        console.log(this.profile);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarPerfil() {
    if (this.profile.profileName !== null || this.profile.profileName !== '') {
      this.adminService.updateProfile(this.profile, this.profileId).subscribe(() => {
        // console.log(response);
        this.location.back();
      });
    } else {
      alert('Complete el formulario con todos los datos necesarios');
    }
  }
}

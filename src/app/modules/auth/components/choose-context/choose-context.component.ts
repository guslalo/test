import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../../models/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { NgxPermissionsService } from 'ngx-permissions';
import { PoliciesService } from '../../../../services/policies.service';
import { TranslocoService } from '@ngneat/transloco';
import { ClinicService } from 'src/app/services/clinic.service';
import { IdleEventsService } from 'src/app/services/idle-events.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-context',
  templateUrl: './choose-context.component.html',
  styleUrls: ['../login/login.component.scss'],
})

export class ChooseContextComponent implements OnInit {
  public UserLogin: UserLogin;
  public user: any = {};
  public arrayAdministrativeData = [];
  public setup:any;
  public dependents: any[];

  constructor(
    private translocoService: TranslocoService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private _policyService: PoliciesService,
    private clinicService:ClinicService,
    private idleEvents: IdleEventsService,
  ) {}

  ngOnInit(): void {
    this.setup = environment.setup
    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext,
      
    );
    this.user.dependents = JSON.parse(localStorage.getItem('dependents'))
    this.dependents = this.user.dependents;
  }

  chooseContext(clinicId, role) {
    //let arrayAdministrativeData = [ ];
    //let arrayAdministrativeData = this.user.administrativeData;

    for (let item of this.user.administrativeData) {
      if (clinicId === item.clinicProfileId) {
        this.arrayAdministrativeData.push(item);
      }
    }
    localStorage.setItem('contextRole', JSON.stringify(this.arrayAdministrativeData));
    //this._policyService.setPoliciesToUser();

    if (localStorage.getItem('firstAccessMultirole') === 'true') {
      this.getRouteForClinicAndRole(clinicId, role);
    } else {
      this.authenticationService.accessWeb(clinicId).subscribe(
        (data) => {
          // console.log(data.access_token);
          if (data.access_token) {
            localStorage.setItem('firstAccessMultirole', 'true');
            localStorage.removeItem('token');
            localStorage.setItem('token', JSON.stringify(data.access_token));
            this.getRouteForClinicAndRole(clinicId, role);
          }
          this._policyService.setPoliciesToUser()
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  chooseDependent(dependentId){
    console.log(dependentId)
    if (dependentId !== this.user.id){
      this.authenticationService.loginDependent(dependentId).subscribe(
        (data) => {
          //console.log(data);
          localStorage.setItem('token', JSON.stringify(data.access_token));
          const newUser = new UserLogin(
            data.id,
            data.email,
            data.name,
            data.lastName,
            data.access_token,
            data.expires_in,
            data.internalCode,
            data.administrativeData,
            data.administrativeDataContext,
            data.administrativeData[0].role,
            data.administrativeData[0].policies,
            data.photo
          );
          localStorage.setItem('token', JSON.stringify(data.access_token));
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          localStorage.setItem('clinic', newUser.administrativeData[0].clinicId);

          this.clinicService.accessMode().subscribe(
            (data) => {
              console.log(data)
              localStorage.setItem('inmediateAppointment', data.payload.immediate.toString());
              localStorage.setItem('scheduleAppointment', data.payload.schedule.toString());
              localStorage.setItem('paymentAppointment', data.payload.payment.toString());
              console.log(data);
              this.router.navigate(['app-paciente']).then(() => this.idleEvents.attachMonitor());
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }else{
      this.clinicService.accessMode().subscribe(
        (data) => {
          console.log(data)
          localStorage.setItem('inmediateAppointment', data.payload.immediate.toString());
          localStorage.setItem('scheduleAppointment', data.payload.schedule.toString());
          localStorage.setItem('paymentAppointment', data.payload.payment.toString());
          console.log(data);
          this.router.navigate(['app-paciente']).then(() => this.idleEvents.attachMonitor());
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getRouteForClinicAndRole(clinicId, role) {
    const profile = this.user.administrativeData.find((profile) => {
      if (profile.clinicProfileId === clinicId && profile.role === role) {
        localStorage.setItem('clinic', profile.clinicId);
        return profile;
      }
    });

    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      clinicId,
      profile.role,
      profile.policies,
      JSON.parse(localStorage.getItem('currentUser')).photo
    );

    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    //console.log(this.user);

    switch (profile.role) {
      case 'admin':
        this.router.navigate(['app-admin']);
        break;
      case 'coordinator':
        this.router.navigate(['app-coordinator']);
        break;
      case 'professional':
        this.router.navigate(['app-professional']);
        break;
    }
  }

  getRoleName(role) {
    switch (role) {
      case 'admin':
        return this.translocoService.translate('common.roles.admin.label');
      case 'coordinator':
        return this.translocoService.translate('common.roles.coordinator.label');
      case 'professional':
        return this.translocoService.translate('common.roles.doctor.label');
    }
  }
}

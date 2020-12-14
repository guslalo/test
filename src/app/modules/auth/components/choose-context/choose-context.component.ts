import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../../models/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

import { NgxPermissionsService } from 'ngx-permissions';
import { PoliciesService } from '../../../../services/policies.service';

@Component({
  selector: 'app-choose-context',
  templateUrl: './choose-context.component.html',
  styleUrls: ['../login/login.component.scss'],
})

export class ChooseContextComponent implements OnInit {
  public UserLogin: UserLogin;
  public user: any = {};
  public arrayAdministrativeData = [ ];

  constructor(private authenticationService: AuthenticationService, private router: Router,   private _policyService: PoliciesService) { }

  ngOnInit(): void {
    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext
    );
  }

  chooseContext(clinicId, role) {
    //let arrayAdministrativeData = [ ];
    //let arrayAdministrativeData = this.user.administrativeData;
    
    for(let item of this.user.administrativeData){
      if(clinicId === item.clinicProfileId ) {
        this.arrayAdministrativeData.push(item);
      } 
    }
    localStorage.setItem('contextRole', JSON.stringify(this.arrayAdministrativeData));
     this._policyService.setPoliciesToUser()
  
      
    


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
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  chooseDependent(dependentId){
    if (dependentId !== this.user.id){
      let dependents: any[] = JSON.parse(localStorage.getItem('dependents'))
      let user = dependents.find(element => element._id = dependentId);
      user.id = user._id;
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this._policyService.setPoliciesToUser()
    this.router.navigate(['app-paciente']);
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
}

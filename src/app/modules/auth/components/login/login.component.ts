//angular
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//environment
import { environment } from 'src/environments/environment';

//services
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';
import { AppointmentsService } from './../../../../services/appointments.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { CurrentUserService } from '../../../../services/current-user.service'

//models
import { UserLogin } from '../../../../models/models';

// translate
import { TranslocoService } from '@ngneat/transloco';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PoliciesService } from '../../../../services/policies.service';
import { ClinicService } from '../../../../services/clinic.service';

import { IdleEventsService } from '../../../../services/idle-events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public UserLogin: UserLogin;
  public formLogin: FormGroup;
  public user: any = {};
  public users: any = [];
  public currentUser: any = {};
  public errorMsg: string;
  public showPassword: boolean;
  public recaptcha: boolean;
  public errorLogin: number;
  public production: boolean;
  public createRoute = "/create-account";
  public setup:any;
  public brand: any;
  public return: string;
  constructor(
    private translocoService: TranslocoService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    // public currentUserService:CurrentUserService,
    private formBuilder: FormBuilder,
    private UserService: UsersService,
    private router: Router,
    private appointmentsService: AppointmentsService,
    private _policyService: PoliciesService,
    private idleEvents: IdleEventsService,
    private clinicService:ClinicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brand = environment.brand
    this.setup = environment.setup
    this.errorLogin = 0;
    localStorage.clear();
    this.spinner.hide();
    if (environment.production === false) {
      this.production = false;
      this.recaptcha = false
      this.formLogin = this.formBuilder.group({
        username: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
      });
    } else {
      this.production = true;
      this.formLogin = this.formBuilder.group({
        username: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
      })
    }
    if(environment.setup == 'CL'){
      this.createRoute = "/create-account-cl"
    }
    this.route.queryParams.subscribe(params => {
      this.return = params['return'] || params['returnUrl']
    })
  }

  setActiveLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  // subscribe post authentication service
  loginUser() {
    this.spinner.show();
    this.authenticationService.loginUser(this.user.username, this.user.password).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data.access_token));
        this.currentUser = new UserLogin(
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
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        localStorage.setItem('clinic', this.currentUser.administrativeData[0].clinicId);

        if (this.currentUser.administrativeData.length < 2) {
          this._policyService.setPoliciesToUser()
        }

        switch (this.currentUser.administrativeData[0].role) {
          case 'admin':
            if (data.internalCode === 6) {
              this.router.navigate(['context']).then(() => this.idleEvents.attachMonitor());
            } else {
              this.router.navigate(['app-admin']).then(() => this.idleEvents.attachMonitor());
            }
            break;
          case 'coordinator':
            if (data.internalCode === 6) {
              this.router.navigate(['context']).then(() => this.idleEvents.attachMonitor());
            } else {
              
              this.router.navigate(['app-coordinator']).then(() => this.idleEvents.attachMonitor());
            }
            break;
          case 'professional':
            if (data.internalCode === 6) {
              this.router.navigate(['context']).then(() => this.idleEvents.attachMonitor());
            } else {
              
              this.clinicService.accessMode().subscribe(
                (data) => {
                  console.log(data)
                  localStorage.setItem('inmediateAppointment', data.payload.immediate.toString());
                  localStorage.setItem('scheduleAppointment', data.payload.schedule.toString());
                  localStorage.setItem('paymentAppointment', data.payload.payment.toString());
                  this.router.navigate(['app-professional']).then(() => this.idleEvents.attachMonitor());
                },
                (error) => {
                  console.log(error);
                }
              );
              
            }
            break;
          case 'patient':
            if (data.internalCode === 6) {
              localStorage.setItem('dependents', JSON.stringify(data.dependents));
              localStorage.setItem('preURL', this.return);
              this.router.navigate(['context']).then(() => this.idleEvents.attachMonitor());
            } else {
              this.clinicService.accessMode().subscribe(
                (data) => {
                  console.log(data)
                  localStorage.setItem('inmediateAppointment', data.payload.immediate.toString());
                  localStorage.setItem('scheduleAppointment', data.payload.schedule.toString());
                  localStorage.setItem('paymentAppointment', data.payload.payment.toString());
                  if(this.return){
                    this.router.navigate([this.return]).then(() => this.idleEvents.attachMonitor());
                  }else{
                    this.router.navigate(['app-paciente']).then(() => this.idleEvents.attachMonitor());
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
            }
            
            /*
            this.appointmentsService.getAppointmentInmediateState().subscribe(
              (data) => {
                localStorage.setItem('inmediateAppointment', data.payload.administrativeDetails.isActive);
                console.log(data);
                this.router.navigate(['app-paciente']).then(() => this.idleEvents.attachMonitor());
              },
              (error) => {
                console.log(error);
              }
            );*/
            break;
        }
        this.spinner.hide();
      },
      (err) => {
        this.errorLogin++
        if (this.errorLogin > 3) {
          this.recaptcha = true;
          if (this.recaptcha === true) {
            this.formLogin = this.formBuilder.group({
              username: new FormControl(null, [Validators.required, Validators.email]),
              password: new FormControl(null, [Validators.required]),
              recaptchaReactive: new FormControl(null, [Validators.required]),
            })
          }
        }
        console.log(this.errorLogin);
        this.spinner.hide();
        this.errorMsg = err.error.message;
        console.log(err);
      }
    );
  }
}

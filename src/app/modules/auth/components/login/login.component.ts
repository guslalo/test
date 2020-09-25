import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
// import { CurrentUserService } from '../../../../services/current-user.service'
import { UsersService } from '../../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLogin } from '../../../../models/models';
import { AppointmentsService } from './../../../../services/appointments.service';
import { environment } from 'src/environments/environment';

// translate
import { TranslocoService } from '@ngneat/transloco';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  formLogin: FormGroup;

  public user: any = {};
  public users: any = [];
  public currentUser: any = {};
  public errorMsg: string;
  public showPassword: boolean;
  public recaptcha: boolean;

  constructor(
    private translocoService: TranslocoService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    // public currentUserService:CurrentUserService,
    private formBuilder: FormBuilder,
    private UserService: UsersService,
    private router: Router,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.spinner.hide();
    if(
      environment.baseUrl != 'https://backend.homeclinic.telemedicina.com/api/'
     ){
      this.recaptcha = false
      this.formLogin = this.formBuilder.group({
        username: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
      });
     }else{
       this.recaptcha = true;
      this.formLogin = this.formBuilder.group({
        username: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        recaptchaReactive: new FormControl(null, Validators.required)
      })
     }

   
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

        switch (this.currentUser.administrativeData[0].role) {
          case 'admin':
            if (data.internalCode === 6) {
              this.router.navigate(['context']);
            } else {
              this.router.navigate(['app-admin']);
            }
            break;
          case 'coordinator':
            // MULTIPROFILE
            if (data.internalCode === 6) {
              this.router.navigate(['context']);
            } else {
              this.router.navigate(['app-coordinator']);
            }
            break;
          case 'professional':
            if (data.internalCode === 6) {
              this.router.navigate(['context']);
            } else {
              this.router.navigate(['app-professional']);
            }
            break;
          case 'patient':
            this.appointmentsService.getAppointmentInmediateState().subscribe(
              (data) => {
                localStorage.setItem('inmediateAppointment', data.payload.administrativeDetails.isActive);
                console.log(data);
                this.router.navigate(['app-paciente']);
              },
              (error) => {
                console.log(error);
              }
            );
            break;
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.errorMsg = err.error.message;
        console.log(err);
      }
    );
  }
}

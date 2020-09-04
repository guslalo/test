import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
// import { CurrentUserService } from '../../../../services/current-user.service'
import { UsersService } from '../../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLogin } from '../../../../models/models';

// translate
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public UserLogin: UserLogin;
  public user: any = {};
  public users: any = [];
  public currentUser: any = {};
  public errorMsg: string;

  constructor(
    private translocoService: TranslocoService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    // public currentUserService:CurrentUserService,
    private UserService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.spinner.hide();
    let lenguaje = navigator.language;
    let lenguajeCorto = lenguaje.split('-');
    console.log(lenguajeCorto[0]);
    this.translocoService.setDefaultLang(lenguajeCorto[0]);
    this.setActiveLang(lenguajeCorto[0]);
  }

  setActiveLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  // subscribe post authentication service
  loginUser() {
    this.spinner.show();
    this.authenticationService.loginUser(this.user.username, this.user.password).subscribe(
      (data) => {
        // console.log(data);
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
          data.administrativeData[0].policies
        );
        localStorage.setItem('token', JSON.stringify(data.access_token));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        console.log(this.currentUser);

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
            this.router.navigate(['app-paciente']);
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

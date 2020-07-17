import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CurrentUserService } from '../../../../services/current-user.service'
import { UsersService } from '../../services/users.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserLogin } from '../../../../models/models';

//translate
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public UserLogin: UserLogin;
  public user: any = { };
  public users: any = [ ];
  public currentUser:any = { };

  constructor(
    private translocoService: TranslocoService,
    private spinner: NgxSpinnerService, 
    private authenticationService:AuthenticationService,
    public currentUserService:CurrentUserService,
    private UserService:UsersService, 
    private router: Router) { }

  ngOnInit(): void {
    //sessionStorage.clear();
    localStorage.clear();
    this.spinner.hide();
  
  }
  setActiveLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  //subscribe post authentication service
  loginUser() {
    this.spinner.show();
    this.authenticationService.loginUser(this.user.username, this.user.password)
    .subscribe( 
      data => {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data.access_token));
        console.log(JSON.parse(localStorage.getItem('token')));
        if (localStorage.getItem('token')) {
          this.getUsers(this.user);
        }
       
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

  //getUsers
  getUsers(user){
    this.UserService.getusers().subscribe(
      data => {
        console.log(user.username);
        console.log(data.data);
         if(user.username === 'gustavo@bluedott.tech'){
          let userMedico = data.data.filter( data => data.email === 'eve.holt@reqres.in' );
          this.currentUser = new UserLogin (
            1, 
            'profesional', 
            userMedico[0].username, 
            userMedico[0].email, 
            userMedico[0].first_name,
            userMedico[0].avatar
          );
          //this.currentUserService.currentUser  = this.currentUser;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.router.navigate(['app-profesional']);
      
        } else {
          let userPaciente = data.data.filter( data => data.email === 'eve.holt@reqres.in' ); 
          //this.currentUserService.currentUser  = userPaciente;
          this.currentUser = new UserLogin (
            2, 
            'paciente', 
            userPaciente[0].username, 
            userPaciente[0].email, 
            userPaciente[0].first_name,
            userPaciente[0].avatar
          );
          console.log(this.currentUser);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          
          //this.currentUserService.currentUser  = this.currentUser;
          this.router.navigate(['app-paciente']);
          this.spinner.hide();
        }
      },
      error => {
        console.log(error);
      }
    )
  }


}

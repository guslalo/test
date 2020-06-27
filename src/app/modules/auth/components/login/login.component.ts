import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CurrentUserService } from '../../../../services/current-user.service'
import { UsersService } from '../../services/users.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserLogin } from '../../../../models/models';


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
    private spinner: NgxSpinnerService, 
    private authenticationService:AuthenticationService,
    public currentUserService:CurrentUserService,
    private UserService:UsersService, 
    private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.spinner.hide();
  }

  //subscribe post authentication service
  loginUser() {
    this.spinner.show();
    this.authenticationService.loginUser(this.user.email, this.user.password)
    .subscribe(
      data => {
        sessionStorage.setItem('token', JSON.stringify(data.token));
        if (sessionStorage.getItem('token')) {
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
        console.log(data.data);
         if(user.email === 'eve.holt@reqres.in'){
          let userMedico = data.data.filter( data => data.email === 'eve.holt@reqres.in' );
          this.currentUser = new UserLogin (
            1, 
            'medico', 
            userMedico[0].email, 
            userMedico[0].first_name,
            userMedico[0].avatar
          );
          //this.currentUserService.currentUser  = this.currentUser;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.router.navigate(['/mis-pacientes']);
      
        } else {
          let userPaciente = data.data.filter( data => data.email === user.email ); 
          //this.currentUserService.currentUser  = userPaciente;
          this.currentUser = new UserLogin (
            2, 
            'paciente', 
            userPaciente[0].email, 
            userPaciente[0].first_name,
            userPaciente[0].avatar
          );
          console.log(this.currentUser);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          //this.currentUserService.currentUser  = this.currentUser;
          this.router.navigate(['/mi-salud']);
          this.spinner.hide();
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  /*
  login() {
    if(this.user.name === 'miguel') {
      sessionStorage.setItem('user','medico');
      console.log('es medico redirgo a pagina medico');
      this.router.navigate(['mis-pacientes']);
    } else {
      
      console.log('no registrado');
    }

    if(this.user.name === 'paciente') {
      sessionStorage.setItem('user','paciente');
      console.log('es medico redirgo a pagina paciente');
      this.router.navigate(['mi-salud']);
    } 
    
   
  }*/

}

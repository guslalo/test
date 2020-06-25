import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/Users.service';
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

  constructor(
    private spinner: NgxSpinnerService, 
    private authenticationService:AuthenticationService,
    private UserService:UsersService, 
    private router: Router) { }

  ngOnInit(): void {
  /*
    setTimeout(() => {/
      this.spinner.hide();
    }, 5000);*/
  
    sessionStorage.removeItem('user');
   // this.getUsers();
  
  }

  

  getUsers(user){
    this.UserService.getusers().subscribe(
      data => {
        console.log(data.data);
         if(user.email === 'eve.holt@reqres.in'){
          let userMedico = data.data.filter(data => data.email === 'eve.holt@reqres.in' );
          console.log(userMedico); 
          //this.router.navigate(['/mis-pacientes']);
        } else {
          let userPaciente = data.data.filter(data => data.email === user.email);
          console.log(userPaciente); 
          //this.router.navigate(['/mi-salud']);
        } 
      },
      error => {
        console.log(error);
      }
    )
  }

  //susbscribe post authentication service
  loginUser() {
    this.spinner.show();
    this.authenticationService.loginUser(this.user.email, this.user.password)
    .subscribe(
      data => {
        sessionStorage.setItem('token', JSON.stringify(data.token));
        if(sessionStorage.getItem('token')){
          this.getUsers(this.user);
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    )
  }

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
    
   
  }

}

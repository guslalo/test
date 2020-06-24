import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: any = { };

  constructor( private authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('user');
  }

  //susbscribe post authentication service
  loginUser() {
    this.authenticationService.loginUser(this.user.email, this.user.password)
    .subscribe(
      data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data.token));
        if(sessionStorage.getItem('currentUser')){
          this.router.navigate(['/mis-pacientes']);
        }
      },
      error => { 
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

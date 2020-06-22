import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../../services/login.services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: any = { };

  constructor( private loginservice:LoginService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('user');
  }

  login() {
    if(this.user.name === 'miguel') {
      sessionStorage.setItem('user','medico');
      console.log('es medico redirgo a pagina medico');
      this.router.navigate(['index']);
    } else {
      
      console.log('no registrado');
    }

    if(this.user.name === 'paciente') {
      sessionStorage.setItem('user','paciente');
      console.log('es medico redirgo a pagina paciente');
      this.router.navigate(['index']);
    } 
    
   
  }

}

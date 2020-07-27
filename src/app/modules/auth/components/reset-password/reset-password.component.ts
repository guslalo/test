import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public user: any = { };

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  
  }

  resetPass(pass){
    this.route.params.subscribe(params => {
      let token  = params.token
      let id  = params.id
      this.authenticationService.resetPassword(token, pass, id).subscribe(
        data => { 
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    });  
  }
}

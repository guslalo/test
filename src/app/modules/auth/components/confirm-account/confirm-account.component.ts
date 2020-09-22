import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  public user: any = {
    code: null,
  };
  public errorMsg: string;

  email_format: string;

  constructor(
    private route: ActivatedRoute,
    private registerUser: RegisterService,
    private router: Router,
    private routerAct: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const email: string = this.routerAct.snapshot.params.email;
    var splitEmail = email.split('@');
    var domain = splitEmail[1];
    var name = splitEmail[0];
    this.email_format = name.substring(0, 3).concat('*********@').concat(domain);
    // console.log(this.email_format);
  }

  // todo: crear aviso registro exitoso
  confirmAccount(code) {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.registerUser.confirmAccount(id, code).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorMsg = err.error.message || err.error[0] || '';
          console.log(err);
        }
      );
    });
  }
}

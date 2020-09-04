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

  constructor(private route: ActivatedRoute, private registerUser: RegisterService, private router: Router) {}

  ngOnInit(): void {}

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

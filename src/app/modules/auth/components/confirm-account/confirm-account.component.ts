import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { environment } from 'src/environments/environment';

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
  public setup:any;

  email_format: string;

  constructor(private route: ActivatedRoute, private registerUser: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.setup = environment.setup
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

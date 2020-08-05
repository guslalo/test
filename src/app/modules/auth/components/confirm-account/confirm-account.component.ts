import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  public user: any = {};

  constructor(private route: ActivatedRoute, private registerUser: RegisterService, private router: Router) {}

  ngOnInit(): void {}

  //todo: crear aviso registro exitoso

  confirmAccount(code) {
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.registerUser.confirmAccount(id, code).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('content') myModal: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  passwordData: FormGroup;

  ngOnInit(): void {
    this.passwordData = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])/),
          Validators.pattern(/^(?=.*[a-z])/),
          Validators.pattern(/^(?=.*[0-9])/),
          Validators.pattern(/^(?=.*[$@$!%*?&])/),
          Validators.pattern(/^.{8,16}$/),
        ]),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])
        ),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );
  }

  confirmPass(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  resetPass() {
    const pass = this.passwordData.get('password').value;
    this.route.params.subscribe((params) => {
      const token = params.token;
      const id = params.id;
      this.authenticationService.resetPassword(token, pass, id).subscribe(
        (data) => {
          console.log(data);
          this.modalService.open(this.myModal, { centered: true });
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}

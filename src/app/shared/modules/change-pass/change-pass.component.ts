import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../modules/auth/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  public model: any = {};
  public changePassForm: FormGroup;
  public passwordNotMatchs: boolean;
  public errorPassCurrent: boolean;
  public fieldTextType: boolean;
  public alertSuccess: boolean;

  ngOnInit(): void {
    this.changePassForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        newPassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])/),
            Validators.pattern(/^(?=.*[a-z])/),
            Validators.pattern(/^(?=.*[0-9])/),
            Validators.pattern(/^(?=.*[$@$!%*?&])/),
            Validators.pattern(/^.{8,16}$/),
          ])
        ),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])/),
          Validators.pattern(/^(?=.*[a-z])/),
          Validators.pattern(/^(?=.*[0-9])/),
          Validators.pattern(/^(?=.*[$@$!%*?&])/),
          Validators.pattern(/^.{8,16}$/),
        ]),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );
  }
  confirmPass(formGroup: FormGroup) {
    const { value: newPassword } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    if (confirmPassword !== newPassword) {
      this.passwordNotMatchs = true;
    }
    return newPassword === confirmPassword ? null : { passwordNotMatch: true };
  }
  changePass() {
    this.authenticationService
      .changePassword(this.changePassForm.value.password, this.changePassForm.value.confirmPassword)
      .subscribe(
        (data) => {
          this.alertSuccess = true;
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.errorPassCurrent = true;
        }
      );

    setTimeout(() => {
      this.alertSuccess = false;
    }, 5000);
  }
}

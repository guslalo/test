import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../modules/auth/services/authentication.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  public model: any = {};
  public changePassForm: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.changePassForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        newPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/)])
        ),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/),
        ]),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );
  }
  public passwordNotMatchs: boolean;
  confirmPass(formGroup: FormGroup) {
    const { value: newPassword } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    if (confirmPassword !== newPassword) {
      this.passwordNotMatchs = true;
    }
    return newPassword === confirmPassword ? null : { passwordNotMatch: true };
  }
  public errorPassCurrent: boolean;
  changePass() {
    this.authenticationService
      .changePassword(this.changePassForm.value.password, this.changePassForm.value.confirmPassword)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.errorPassCurrent = true;
        }
      );
  }
}

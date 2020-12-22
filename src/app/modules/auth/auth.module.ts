// core
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

// modules
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

// shared
import { SharedModule } from './../../shared/shared.module';

// routing
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// components
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { BlockedAccountComponent } from './components/blocked-account/blocked-account.component';
import { LeftColumnComponent } from './components/left-column/left-column.component';
import { CreateAccountCLComponent } from "./components/create-account-cl/create-account-cl.component";

import { MatStepperModule } from '@angular/material/stepper';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ChooseContextComponent } from './components/choose-context/choose-context.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FinishRegistrationComponent } from './components/finish-registration/finish-registration.component';
import { FinishRegistrationCLComponent } from './components/finish-registration-cl/finish-registration-cl.component';
import { RouterModule } from '@angular/router';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { RecoveryDoneComponent } from './components/recovery-done/recovery-done.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecoveryComponent,
    CreateAccountComponent,
    FinishRegistrationComponent,
    BlockedAccountComponent,
    LeftColumnComponent,
    ChooseContextComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    RecoveryDoneComponent,
    CreateAccountCLComponent,
    FinishRegistrationCLComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    NgbDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    RouterModule,
    SharedModule,
    TranslocoRootModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxMaskModule.forRoot({
      validation: true,
    })
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}

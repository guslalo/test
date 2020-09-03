// core
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { NgxSpinnerModule } from 'ngx-spinner';

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

import { MatStepperModule } from '@angular/material/stepper';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LangComponent } from './components/lang/lang.component';
import { ChooseContextComponent } from './components/choose-context/choose-context.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    LoginComponent,
    RecoveryComponent,
    CreateAccountComponent,
    BlockedAccountComponent,
    LeftColumnComponent,
    LangComponent,
    ChooseContextComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxSpinnerModule,
    SharedModule.forRoot(),
    NgbDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    HttpClientModule
    
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}

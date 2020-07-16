//core
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//modules
import { NgxSpinnerModule } from "ngx-spinner";
import { PasswordStrengthMeterModule } from './components/create-account/lib/password-strength-meter.module';

//routing
import { AuthRoutingModule } from './auth-routing.module';

//components
import { LoginComponent } from './components/login/login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { BlockedAccountComponent } from './components/blocked-account/blocked-account.component';
import { LeftColumnComponent } from './components/left-column/left-column.component';

//Translation
import { HttpClient } from '@angular/common/http';
import { SharedModule } from './../../shared/shared.module';

import  { MatStepperModule } from '@angular/material/stepper';
import  { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LangComponent } from './components/lang/lang.component';



@NgModule({
  declarations: [
    LoginComponent,
    RecoveryComponent,
    CreateAccountComponent,
    BlockedAccountComponent,
    LeftColumnComponent,
    LangComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    PasswordStrengthMeterModule,
    SharedModule.forRoot(),
    NgbDatepickerModule,
    MatStepperModule
  
  ],
  exports:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AuthModule { }

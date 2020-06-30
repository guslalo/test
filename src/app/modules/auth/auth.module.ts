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

@NgModule({
  declarations: [
    LoginComponent,
    RecoveryComponent,
    CreateAccountComponent,
    BlockedAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    PasswordStrengthMeterModule
  ],
  exports:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AuthModule { }

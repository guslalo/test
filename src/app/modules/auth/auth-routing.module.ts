import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RecoveryDoneComponent } from './components/recovery-done/recovery-done.component';
import { ChooseContextComponent } from './components/choose-context/choose-context.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FinishRegistrationComponent } from './components/finish-registration/finish-registration.component';
import { BlockedAccountComponent } from './components/blocked-account/blocked-account.component';
import { CreateAccountCLComponent } from './components/create-account-cl/create-account-cl.component';
import { FinishRegistrationCLComponent } from './components/finish-registration-cl/finish-registration-cl.component';

const recovery = 'recovery-password';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: 'WePays'}
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: 'create-account-cl',
    component: CreateAccountCLComponent,
  },
  {
    path: 'finish-registration',
    component: FinishRegistrationComponent,
  },
  {
    path: 'finish-registration-cl',
    component: FinishRegistrationCLComponent,
  },
  {
    path: 'context',
    component: ChooseContextComponent,
    //canActivate: [GuardsGuard],
  },
  {
    path: 'confirm-account/:id',
    component: ConfirmAccountComponent,
  },
  {
    path: 'recovery-password',
    component: RecoveryComponent,
  },
  {
    path: 'recovery-done',
    component: RecoveryDoneComponent,
  },
  {
    path: 'recovery-password/reset-password/:id/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'blocked-account',
    component: BlockedAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

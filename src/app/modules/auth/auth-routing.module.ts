import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { ChooseContextComponent } from './components/choose-context/choose-context.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LayoutModule } from '../../modules/layout/layout.module';

const recovery = 'recovery-password';

const routes: Routes = [
  /*{
    path: 'app-professional',
    loadChildren: () => import('./../layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'app-patient',
    loadChildren: () => import('./../layout/layout.module').then(m => m.LayoutModule)
  },*/
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
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
    path: recovery,
    component: RecoveryComponent,
  },
  {
    path: recovery + '/reset-password/:id/:token',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

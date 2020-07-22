import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { ChooseContextComponent } from './components/choose-context/choose-context.component';
import { ProfesionalGuard } from '../../guards/profesional.guard'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'context',
    component: ChooseContextComponent,
    canActivate: [ProfesionalGuard]
  },
  {
    path: 'recovery-password',
    component: RecoveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  /*
  {
    path: ':id',
    component: FichaPacienteComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Read:MedicalRecord'],
      }
    }
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasRoutingModule { }

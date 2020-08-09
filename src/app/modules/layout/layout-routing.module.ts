//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LayoutComponent } from './components/layout/layout.component';

import { Consulta2Component } from '../pacientes/consulta2/consulta2.component';
import { PerfilComponent } from '../pacientes/perfil/perfil.component';

//guards
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { ChangePassComponent } from '../../shared/modules/change-pass/change-pass.component';


//const profesional
const historialConsulta = 'historial-consultas';
const MisPacientes = 'mis-pacientes';

const routes: Routes = [
  {
    path: 'app-admin',
    component: LayoutComponent, 
    canActivate: [GuardsGuard],
    children: [
      {
        path: '', 
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
        canActivate: [],
      }
    ],
  },
  {
    path: 'app-paciente',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '', 
        loadChildren: () => import('../pacientes/pacientes.module').then(m => m.PacientesModule),
        canActivate: [PacienteGuard]
      }
    ],
  },
  {
    path: 'app-professional',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '', 
        loadChildren: () => import('../profesionales/profesionales.module').then(m => m.ProfesionalesModule),
        canActivate: [ProfesionalGuard]
      },
      { path: 'perfil', component: PerfilComponent },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] }
    ],
  },
  {
    path: 'cita/:appointmentId',
    component: Consulta2Component,
    canActivate: [GuardsGuard],
  },
  {
    path: 'meet/:appointmentId',
    component: Consulta2Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), //, { useHash: true }
  ],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

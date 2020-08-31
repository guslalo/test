// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LayoutComponent } from './components/layout/layout.component';

import { Consulta2Component } from '../pacientes/consulta2/consulta2.component';


// GUARDS
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { CoordinatorGuard } from '../../guards/coordinator.guard';
import { CambiarClaveComponent } from '../pacientes/cambiar-clave/cambiar-clave.component';


import { ChangePassComponent } from '../../shared/modules/change-pass/change-pass.component';


const routes: Routes = [
  {
    path: 'app-admin',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'app-paciente',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../pacientes/pacientes.module').then((m) => m.PacientesModule),
        canActivate: [PacienteGuard],
      },
    ],
  },
  {
    path: 'app-professional',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../profesionales/profesionales.module').then((m) => m.ProfesionalesModule),
        canActivate: [ProfesionalGuard],
      },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] },
    ],
  },
  {
    path: 'app-coordinator',
    component: LayoutComponent,
    canActivate: [],//GuardsGuard
    children: [
      {
        path: '',
        loadChildren: () => import('../coordinator/coordinator.module').then((m) => m.CoordinatorModule),
        canActivate: [],//CoordinatorGuard
      },
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
    RouterModule.forChild(routes), // , { useHash: true }
  ],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

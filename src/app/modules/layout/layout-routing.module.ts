// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LayoutComponent } from './components/layout/layout.component';
import { ChangePassComponent } from '../../shared/modules/change-pass/change-pass.component';

// GUARDS
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { CoordinatorGuard } from '../../guards/coordinator.guard';
import { CambiarClaveComponent } from '../pacientes/cambiar-clave/cambiar-clave.component';
import { LegalsComponent} from './components/legals/legals.component';

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
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] }
    ]
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
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] }
    ]
  },
  {
    path: 'app-professional',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../profesionales/profesionales.module').then((m) => m.ProfesionalesModule),
        canActivate: [ProfesionalGuard]
      },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] }
    ],
  },
  {
    path: 'app-coordinator',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../coordinator/coordinator.module').then((m) => m.CoordinatorModule),
        canActivate: [CoordinatorGuard]
      },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] }
    ],
  },
  {
    path: 'terms-and-conditions',
    component: LegalsComponent
  },
  {
    path: 'privacy',
    component: LegalsComponent
  },
  {
    path: 'consent',
    component: LegalsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})

export class LayoutRoutingModule {}

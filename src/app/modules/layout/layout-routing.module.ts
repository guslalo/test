import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { MiSaludComponent } from '../pacientes/mi-salud/mi-salud.component';
import { GuardsGuard} from '../../guards/guards.guard'
import { ProfesionalGuard } from '../../guards/profesional.guard'
import { PacienteGuard } from '../../guards/paciente.guard'



const routes: Routes = [
  {
    path: 'mis-pacientes',
    component: LayoutComponent,
    //canActivate: [ProfesionalGuard],
    children: [
      { path: '', component:  PacientesComponent }
    ]
  },
  {
    path: 'mi-salud',
    component: LayoutComponent,
    //canActivate: [PacienteGuard],
    children: [
      { path: '', component:  MiSaludComponent }
    ]
  }
  
];



@NgModule({
  imports: [
    RouterModule.forChild(routes),
  
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

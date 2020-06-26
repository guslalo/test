//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
//components
import { LayoutComponent } from './components/layout/layout.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { MiSaludComponent } from '../pacientes/mi-salud/mi-salud.component';
//guards
import { GuardsGuard} from '../../guards/guards.guard'
import { ProfesionalGuard } from '../../guards/profesional.guard'
import { PacienteGuard } from '../../guards/paciente.guard'
import { FichaPacienteComponent } from './../profesionales/ficha-paciente/ficha-paciente.component';

const routes: Routes = [
  {
    path: 'mis-pacientes',
    component: LayoutComponent,
     canActivate: [GuardsGuard],
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
  },
  {
    path: 'ficha-paciente',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  FichaPacienteComponent }
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

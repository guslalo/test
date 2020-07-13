//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
//components
import { LayoutComponent } from './components/layout/layout.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { MiSaludComponent } from '../pacientes/mi-salud/mi-salud.component';
import { InicioComponent } from '../pacientes/inicio/inicio.component';
import { MisConsultasComponent } from '../pacientes/mis-consultas/mis-consultas.component';
import { ConsultaComponent } from '../pacientes/consulta/consulta.component';
import { Consulta2Component } from '../pacientes/consulta2/consulta2.component';
import { PerfilComponent } from '../pacientes/perfil/perfil.component';

//guards
import { GuardsGuard} from '../../guards/guards.guard'
import { ProfesionalGuard } from '../../guards/profesional.guard'
import { PacienteGuard } from '../../guards/paciente.guard'
import { FichaPacienteComponent } from './../profesionales/ficha-paciente/ficha-paciente.component';
import { CambiarClaveComponent } from '../pacientes/cambiar-clave/cambiar-clave.component';
import { SoporteComponent } from '../pacientes/./soporte/soporte.component';

import { InicioPComponent } from '../profesionales/inicio/inicio.component';

/*if(JSON.parse(localStorage.getItem('currentUser')).type === 'paciente'){}*/

const routes: Routes = [
  {
    path: 'app-paciente',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  InicioComponent },
      { path: 'perfil', component:  PerfilComponent },
      { path: 'cambiar-contrasena', component:  CambiarClaveComponent },
      { path: 'ayuda', component:  SoporteComponent },
      { path: 'mis-consultas', component:  MisConsultasComponent },
      { path: 'mi-salud', component:  MiSaludComponent },
      { path: 'consulta/:appointmentId', component: ConsultaComponent },
     
    ]
  },
  {
    path: 'app-profesional',
    component: LayoutComponent, //    canActivate: [GuardsGuard]
    children: [
      { path: '', component:  InicioPComponent },
      { path: 'mi-agenda', component:  PacientesComponent },
      { path: 'mis-pacientes', component:  PacientesComponent }
      //{ path: 'consulta/:appointmentId', component: ConsultaComponent }
    ]
  },
  { 
    path: 'cita/:appointmentId', component: Consulta2Component,
    canActivate: [GuardsGuard]
  },
  {
    path: 'meet/:appointmentId',
    component: Consulta2Component
  },
  {
    path: 'app-admin',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  InicioComponent },
      { path: 'ficha-pacientes', component:  FichaPacienteComponent },
      { path: 'mis-pacientes', component:  PacientesComponent }
      //{ path: 'consulta/:appointmentId', component: ConsultaComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)//, { useHash: true }
  ],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }

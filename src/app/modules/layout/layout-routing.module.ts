//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { CambiarClaveComponent } from '../pacientes/cambiar-clave/cambiar-clave.component';
import { SoporteComponent } from '../pacientes/./soporte/soporte.component';

import { InicioPComponent } from '../profesionales/inicio/inicio.component';

import { MiDisponibilidadComponent } from '../profesionales/modules/mi-disponibilidad/mi-disponibilidad.component';
import { HistorialConsultasComponent } from '../profesionales/modules/historial-consultas/historial-consultas.component';
import { FichaConsultaComponent } from '../profesionales/modules/ficha-consulta/ficha-consulta.component';
import { MisPacientesComponent } from '../profesionales/modules/mis-pacientes/mis-pacientes.component';
import { FichaPacienteComponent } from '../profesionales/modules/ficha-paciente/ficha-paciente.component';
import { CrearFichaConsultaComponent } from '../profesionales/modules/crear-ficha-consulta/crear-ficha-consulta.component';

import { ChangePassComponent } from '../../shared/modules/change-pass/change-pass.component';
import { AgendaComponent } from '../profesionales/modules/agenda/agenda.component';


//const profesional
const historialConsulta = 'historial-consultas';
const MisPacientes = 'mis-pacientes';

const routes: Routes = [
  {
    path: 'app-admin',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: 'usuarios', component: InicioComponent },
      { 
        path: 'gestion-perfil', 
        loadChildren: () => import('../admin/modules/admin-profiles/admin-profiles.module').then(m => m.AdminProfilesModule),
        canActivate: []  
      },
      { path: 'perfil', component: PerfilComponent },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] }
    ],
  },
  {
    path: 'app-paciente',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'cambiar-contrasena', component: CambiarClaveComponent },
      { path: 'ayuda', component: SoporteComponent },
      { path: 'mis-consultas', component: MisConsultasComponent },
      { path: 'mi-salud', component: MiSaludComponent },
      { path: 'consulta/:appointmentId', component: ConsultaComponent },
    ],
  },
  {
    path: 'app-professional',
    //loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule),
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component: InicioPComponent },
      { path: 'context', component: InicioPComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] },
      { path: 'mi-agenda', component: AgendaComponent, canActivate: [ProfesionalGuard] },
      { path: MisPacientes, component: MisPacientesComponent, canActivate: [ProfesionalGuard] },
      { path: MisPacientes + '/ficha-paciente', component: FichaPacienteComponent, canActivate: [ProfesionalGuard] },
      { path: 'mi-disponibilidad', component: MiDisponibilidadComponent, canActivate: [ProfesionalGuard] },
      {
        path: historialConsulta,
        component: HistorialConsultasComponent,
        canActivate: [ProfesionalGuard],
        children: [{ path: 'ficha-consultas', component: FichaConsultaComponent, canActivate: [ProfesionalGuard] }],
      },
      {
        path: historialConsulta + '/ficha-consulta',
        component: FichaConsultaComponent,
        canActivate: [ProfesionalGuard],
      },
      { path: 'crear-ficha-consulta', component: CrearFichaConsultaComponent, canActivate: [ProfesionalGuard] },
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

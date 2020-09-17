// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components

// import { PacientesComponent } from './pacientes/pacientes.component';

// guards
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';

import { FichaPacienteComponent } from './modules/ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';
//import { FichaConsultaComponent } from './modules/ficha-consulta/ficha-consulta.component';

import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MisPacientesComponent } from './modules/mis-pacientes/mis-pacientes.component';
import { AgendaComponent } from './modules/agenda/agenda.component';
import { PerfilComponent } from 'src/app/shared/modules/mi-perfil/mi-perfil.component';

// const profesional
const historialConsulta = 'historial-consultas';
const MisPacientes = 'mis-pacientes';
// routing

const routes: Routes = [
  {
    path: 'sala-espera',
    loadChildren: () => import('./modules/sala-espera/sala-espera.module').then((m) => m.SalaEsperaModule),
  },
  {
    path: 'professional/consulta/:appointmentId',
    loadChildren: () => import('./modules/video-call/video-call.module').then((m) => m.VideoCallModule),
  },
  { path: '', component: InicioPComponent },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  { path: 'context', component: InicioPComponent },
  { path: 'mi-agenda', component: AgendaComponent, canActivate: [ProfesionalGuard] },
  { path: MisPacientes, component: MisPacientesComponent, canActivate: [ProfesionalGuard] },
  { path: MisPacientes + '/ficha-paciente', component: FichaPacienteComponent, canActivate: [ProfesionalGuard] },
  { path: 'mi-disponibilidad', component: MiDisponibilidadComponent, canActivate: [ProfesionalGuard] },
  {
    path: 'ficha-consulta/:appointmentId',
    loadChildren: () => import('./modules/ficha-consulta/ficha-consulta.module').then((m) => m.FichaConsultaModule),
  },
  {
    path: 'historial-consultas',
    loadChildren: () =>
      import('./modules/historial-consultas/historial-consultas.module').then((m) => m.HistorialConsultasModule),
  },
  {
    path: 'crear-ficha-consulta/:appointmentId',
    loadChildren: () => import('./modules/crear-ficha/crear-ficha.module').then((m) => m.CrearFichaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalesRoutingModule {}

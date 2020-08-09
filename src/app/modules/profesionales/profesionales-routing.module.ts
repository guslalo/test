//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components

//import { PacientesComponent } from './pacientes/pacientes.component';

//guards
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';

import { FichaPacienteComponent } from './modules/ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';
import { HistorialConsultasComponent } from './modules/historial-consultas/historial-consultas.component';
import { FichaConsultaComponent } from './modules/ficha-consulta/ficha-consulta.component';

import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MisPacientesComponent } from './modules/mis-pacientes/mis-pacientes.component';
import { AgendaComponent } from './modules/agenda/agenda.component';
import { CrearFichaConsultaComponent } from './modules/crear-ficha-consulta/crear-ficha-consulta.component';


//const profesional
const historialConsulta = 'historial-consultas';
const MisPacientes = 'mis-pacientes';
//routing

const routes: Routes = [
  { path: '', component: InicioPComponent },
      { path: 'context', component: InicioPComponent },
  
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
      { path: 'crear-ficha-consulta', component: CrearFichaConsultaComponent, canActivate: [ProfesionalGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalesRoutingModule {}

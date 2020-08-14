// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
// import { LayoutComponent } from './components/layout/layout.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { MiSaludComponent } from './mi-salud/mi-salud.component';
// guards
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { FichaPacienteComponent } from '../profesionales/modules/ficha-paciente/ficha-paciente.component';

import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { Consulta2Component } from './consulta2/consulta2.component';

import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from '../../services/opentok.service';
import { PerfilComponent } from './perfil/perfil.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { SoporteComponent } from './soporte/soporte.component';
// import { MisConsultasFilterComponent } from './mis-consultas-filter/mis-consultas-filter.component';


// routing

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'agendar-consulta',
    loadChildren: () => import('./modules/agendar/agendar.module').then((m) => m.AgendarModule),
  },
  { path: 'perfil', component: PerfilComponent },
  { path: 'cambiar-contrasena', component: CambiarClaveComponent },
  { path: 'ayuda', component: SoporteComponent },
  { path: 'mis-consultas', component: MisConsultasComponent },
  { path: 'mi-salud', component: MiSaludComponent },
  { path: 'consulta/:appointmentId', component: ConsultaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}

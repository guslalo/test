// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
// import { LayoutComponent } from './components/layout/layout.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
// guards
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { FichaPacienteComponent } from '../profesionales/modules/ficha-paciente/ficha-paciente.component';

import { ConsultaComponent } from './consulta/consulta.component';
import { Consulta2Component } from './consulta2/consulta2.component';

import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from '../../services/opentok.service';

import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';


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
  {
    path: 'mi-salud',
    loadChildren: () => import('./modules/mi-salud/mi-salud.module').then((m) => m.MiSaludModule),
  },
  {
    path: 'mis-consultas',
    loadChildren: () => import('./modules/mis-consultas/mis-consultas.module').then((m) => m.MisConsultasModule),
  },
  {
    path: 'patient/consulta/:appointmentId',
    loadChildren: () => import('./modules/video-call/video-call.module').then((m) => m.VideoCallModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./modules/mi-perfil/mi-perfil.module').then((m) => m.MiPerfilModule),
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./modules/soporte/soporte.module').then((m) => m.SoporteModule),
  },

  { path: 'cambiar-contrasena', component: CambiarClaveComponent },
  //{ path: 'mis-consultas', component: MisConsultasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}

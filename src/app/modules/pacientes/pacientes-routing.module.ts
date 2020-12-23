// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components

// guards
import { InmediateAppointmentGuard } from './../../guards/inmediateAppointment.guard';
import { FichaPacienteComponent } from '../profesionales/modules/ficha-paciente/ficha-paciente.component';

import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { PerfilComponent } from 'src/app/shared/modules/mi-perfil/mi-perfil.component';
import { PerfilCLComponent } from 'src/app/shared/modules/mi-perfil-cl/mi-perfil-cl.component';


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
    path: 'reagendar-consulta/:appointmentId/:SpecialtiesId',
    loadChildren: () => import('./modules/agendar/agendar.module').then((m) => m.AgendarModule),
  },
  {
    path: 'agendar-consulta-inmediata',
    loadChildren: () =>
      import('./modules/agendar-consulta-inmediata/agendar-consulta-inmediata.module').then(
        (m) => m.AgendarConsultaInmediataModule
      ),
    canActivate: [InmediateAppointmentGuard]
  },
  {
    path: 'mi-salud',
    loadChildren: () => import('./modules/mi-salud/mi-salud.module').then((m) => m.MiSaludModule)
  },
  {
    path: 'mis-consultas',
    loadChildren: () => import('./modules/mis-consultas/mis-consultas.module').then((m) => m.MisConsultasModule)
  },
  {
    path: 'teleconsulta/:appointmentId',
    loadChildren: () => import('./modules/teleconsulta/teleconsulta.module').then((m) => m.TeleconsultaModule)
  },
  {
    path: 'patient/consulta/:appointmentId',
    loadChildren: () => import('./modules/video-call/video-call.module').then((m) => m.VideoCallModule)
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'perfil-cl',
    component: PerfilCLComponent
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./modules/soporte/soporte.module').then((m) => m.SoporteModule)
  },
  { path: 'cambiar-contrasena', component: CambiarClaveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}

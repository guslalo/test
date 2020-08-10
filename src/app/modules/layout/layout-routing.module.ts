//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LayoutComponent } from './components/layout/layout.component';

import { Consulta2Component } from '../pacientes/consulta2/consulta2.component';
import { PerfilComponent } from '../pacientes/perfil/perfil.component';

// GUARDS
import { GuardsGuard } from '../../guards/guards.guard';
import { ProfesionalGuard } from '../../guards/profesional.guard';
import { PacienteGuard } from '../../guards/paciente.guard';
import { AdminGuard } from '../../guards/admin.guard';
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

// ADMIN ROUTES
import { UsuariosComponent } from '../admin/usuarios/usuarios.component';
import { CrearUsuarioComponent } from '../admin/modules/crear-usuario/crear-usuario.component';

/*if(JSON.parse(localStorage.getItem('currentUser')).type === 'paciente'){}*/

//const profesional
const historialConsulta = 'historial-consultas';
const MisPacientes = 'mis-pacientes';

const routes: Routes = [
  {
    path: 'app-admin',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
        canActivate: [],
      },
    ],
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
    ],
  },
  {
    path: 'app-professional',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../profesionales/profesionales.module').then((m) => m.ProfesionalesModule),
        canActivate: [ProfesionalGuard],
      },
      { path: 'perfil', component: PerfilComponent },
      { path: 'change-password', component: ChangePassComponent, canActivate: [GuardsGuard] },
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

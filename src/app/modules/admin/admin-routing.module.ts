// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from 'src/app/shared/modules/mi-perfil/mi-perfil.component';
import { PerfilCLComponent } from 'src/app/shared/modules/mi-perfil-cl/mi-perfil-cl.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'perfil-cl',
    component: PerfilCLComponent,
  },
  {
    path: 'gestion-perfil',
    loadChildren: () => import('./modules/admin-profiles/admin-profiles.module').then((m) => m.AdminProfilesModule),
  },
  {
    path: 'gestion-agenda',
    loadChildren: () => import('./modules/agenda/agenda.module').then((m) => m.AgendaModule),
  },
  {
    path: 'gestion-salas',
    loadChildren: () => import('./modules/gestion-salas/gestion-salas.module').then((m) => m.GestionSalasModule),
  },
  {
    path: 'configuracion-clinica',
    loadChildren: () =>
      import('./modules/configuracion-clinica/configuracion-clinica.module').then((m) => m.ConfiguracionClinicaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

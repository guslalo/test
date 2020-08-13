//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: 'gestion-perfil',
    loadChildren: () => import('./modules/admin-profiles/admin-profiles.module').then((m) => m.AdminProfilesModule),
  },
  {
    path: 'gestion-agenda',
    loadChildren: () => import('./modules/agenda/agenda.module').then((m) => m.AgendaModule),
  },
  {
    path: 'gestion-salas',
    loadChildren: () => import('./modules/gestion-salas/gestion-salas.module').then((m) => m.GestionSalasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

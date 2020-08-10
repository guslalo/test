//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'gestion-perfil',
    loadChildren: () => import('./modules/admin-profiles/admin-profiles.module').then((m) => m.AdminProfilesModule),
    canActivate: [],
  } /**/,
  {
    path: 'gestion-agenda',
    loadChildren: () => import('./modules/agenda/agenda.module').then((m) => m.AgendaModule),
    canActivate: [],
  } /**/,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

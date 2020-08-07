//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: []
  },
  {
    path: 'crear-perfil',
    component: CrearPerfilComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProfileRoutingModule {}

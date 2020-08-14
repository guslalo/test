// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexProfileComponent } from './components/indexProfile/indexProfile.component';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: IndexProfileComponent
  },
  {
    path: 'crear-perfil',
    component: CrearPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProfileRoutingModule {}

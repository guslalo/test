// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexProfileComponent } from './components/indexProfile/indexProfile.component';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: IndexProfileComponent,
  },
  {
    path: 'crear-perfil',
    component: CrearPerfilComponent,
  },
  {
    path: 'editar-perfil',
    component: EditarPerfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProfileRoutingModule {}

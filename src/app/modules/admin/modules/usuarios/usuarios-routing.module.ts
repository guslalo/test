//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

const routes: Routes = [

  {
    path: '',
    component: UsuariosComponent
  },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRountingModule {}

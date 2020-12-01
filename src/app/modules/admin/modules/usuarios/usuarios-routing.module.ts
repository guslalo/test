// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { EditarUsuarioCLComponent } from './components/editar-usuario-cl/editar-usuario-cl.component';
import { CrearUsuarioComponentCL } from "./components/crear-usuario-cl/crear-usuario-cl.component";

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'crear-usuario-cl', component: CrearUsuarioComponentCL },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'editar-usuario-cl', component: EditarUsuarioCLComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRountingModule {}

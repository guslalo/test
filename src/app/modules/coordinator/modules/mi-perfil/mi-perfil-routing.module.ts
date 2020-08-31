import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  { path: '', component: PerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiPerfilRoutingModule { }

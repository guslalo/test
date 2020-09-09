// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { EditarSalaComponent } from './components/editar-sala/editar-sala.component';
import { VerSalaComponent } from './components/index/ver-sala.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: ':roomId',
    component: VerSalaComponent,
  },
  {
    path: 'editar-sala/:roomId',
    component: EditarSalaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionSalasRountingModule {}

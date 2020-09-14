import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { VerSalaComponent } from './components/index/ver-sala.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: ':roomId',
    component: VerSalaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaEsperaRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { TeleconsultaComponent } from '../teleconsulta/components/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: ':id',
    component: TeleconsultaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialConsultasRoutingModule {}

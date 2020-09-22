import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaConsultaComponent } from './components/ficha-consulta.component';

const routes: Routes = [
  {
    path: '',
    component: FichaConsultaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaConsultaRoutingModule {}

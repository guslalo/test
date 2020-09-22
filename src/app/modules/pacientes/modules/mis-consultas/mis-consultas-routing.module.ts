import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

const routes: Routes = [
  {
    path: '',
    component: MisConsultasComponent,
    children: [],
  },
  {
    path: 'consulta/:appointmentId',
    component: ConsultaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisConsultasRoutingModule {}

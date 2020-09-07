import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearFichaConsultaComponent } from './components/crear-ficha-consulta/crear-ficha-consulta.component';


const routes: Routes = [
  { path: '', component: CrearFichaConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearFichaRoutingModule { }

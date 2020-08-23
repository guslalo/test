import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';


const routes: Routes = [
  { path: '', component: MisConsultasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisConsultasRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { FichaPacienteComponent } from './components/ficha-paciente/ficha-paciente.component';



const routes: Routes = [
  {
    path:'', component:IndexComponent
  },
  {
    path:':id', component:FichaPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }

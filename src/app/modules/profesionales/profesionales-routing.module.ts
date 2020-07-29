//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
//components
//import { LayoutComponent } from './components/layout/layout.component';
import { PacientesComponent } from './pacientes/pacientes.component';
//import { MiSaludComponent } from './mi-salud/mi-salud.component';
//guards
import { GuardsGuard} from '../../guards/guards.guard'
import { ProfesionalGuard } from '../../guards/profesional.guard'
import { PacienteGuard } from '../../guards/paciente.guard'
import { InicioPComponent } from '../profesionales/inicio/inicio.component';


//routing


const routes: Routes = [
  {
    path: '',
   // component: LayoutComponent,
     canActivate: [GuardsGuard],
    children: [
      { path: '', component:  InicioPComponent }
    ]
  } 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class ProfesionalesRoutingModule { }

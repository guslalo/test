//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
//components
import { LayoutComponent } from './components/layout/layout.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { MiSaludComponent } from '../pacientes/mi-salud/mi-salud.component';
import { InicioComponent } from '../pacientes/inicio/inicio.component';
import { MisConsultasComponent } from '../pacientes/mis-consultas/mis-consultas.component';
import { ConsultaComponent } from '../pacientes/consulta/consulta.component';

//guards
import { GuardsGuard} from '../../guards/guards.guard'
import { ProfesionalGuard } from '../../guards/profesional.guard'
import { PacienteGuard } from '../../guards/paciente.guard'
import { FichaPacienteComponent } from './../profesionales/ficha-paciente/ficha-paciente.component';

/*if(JSON.parse(localStorage.getItem('currentUser')).type === 'paciente'){}*/

const routes: Routes = [
  {
    path: 'app-paciente',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  InicioComponent },
      { path: 'mis-consultas', component:  MisConsultasComponent },
      { path: 'mi-salud', component:  MiSaludComponent },
      { path: 'consulta/:appointmentId', component: ConsultaComponent }
    ]
  },
  {
    path: 'app-profesional',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  InicioComponent },
      { path: 'ficha-pacientes', component:  FichaPacienteComponent },
      { path: 'mis-pacientes', component:  PacientesComponent }
      //{ path: 'consulta/:appointmentId', component: ConsultaComponent }
    ]
  },
  {
    path: 'app-admin',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  InicioComponent },
      { path: 'ficha-pacientes', component:  FichaPacienteComponent },
      { path: 'mis-pacientes', component:  PacientesComponent }
      //{ path: 'consulta/:appointmentId', component: ConsultaComponent }
    ]
  },
  {
    path: 'meet',
    component: LayoutComponent,
    canActivate: [],
    children: [
      { path: '', component:  MisConsultasComponent },
      { path: 'cita/:appointmentId', component: ConsultaComponent }
    ]
  },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)//, { useHash: true }
  ],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaPacienteComponent } from './ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { ProfesionalesRoutingModule } from '../profesionales/profesionales-routing.module';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';

@NgModule({
  declarations: [
    FichaPacienteComponent,
    PacientesComponent,
    InicioPComponent
  ],
  imports: [
    CommonModule,
    ProfesionalesRoutingModule
  ],
  exports:[
    FichaPacienteComponent,
    InicioPComponent
  ]
})

export class ProfesionalesModule { }

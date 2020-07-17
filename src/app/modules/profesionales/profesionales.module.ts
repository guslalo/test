import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaPacienteComponent } from './ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { ProfesionalesRoutingModule } from '../profesionales/profesionales-routing.module';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';

@NgModule({
  declarations: [
    FichaPacienteComponent,
    PacientesComponent,
    InicioPComponent,
    MiDisponibilidadComponent
  ],
  imports: [
    CommonModule,
    ProfesionalesRoutingModule
  ],
  exports:[
    FichaPacienteComponent,
    InicioPComponent,
    MiDisponibilidadComponent
  ]
})

export class ProfesionalesModule { }

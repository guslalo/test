import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaPacienteComponent } from './ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';



@NgModule({
  declarations: [
    FichaPacienteComponent,
    PacientesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FichaPacienteComponent
  ]
})
export class ProfesionalesModule { }

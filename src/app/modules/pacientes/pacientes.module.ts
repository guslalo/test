import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MiSaludComponent } from './mi-salud/mi-salud.component';



@NgModule({
  declarations: [PacientesComponent, MiSaludComponent],
  imports: [
    CommonModule
  ]
})
export class PacientesModule { }

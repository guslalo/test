import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
//import interactionPlugin from '@fullcalendar/angular/fullcalendar-angular'; // a plugin

import { FichaPacienteComponent } from './ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { ProfesionalesRoutingModule } from '../profesionales/profesionales-routing.module';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);


@NgModule({
  declarations: [
    FichaPacienteComponent,
    PacientesComponent,
    InicioPComponent,
    MiDisponibilidadComponent
  ],
  imports: [
    CommonModule,
    ProfesionalesRoutingModule,
    FullCalendarModule 
  ],
  exports:[
    FichaPacienteComponent,
    InicioPComponent,
    MiDisponibilidadComponent
  ]
})

export class ProfesionalesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

//import interactionPlugin from '@fullcalendar/angular/fullcalendar-angular'; // a plugin

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

//
import { OwlModule } from 'ngx-owl-carousel';

//components
import { FichaPacienteComponent } from './modules/ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { ProfesionalesRoutingModule } from '../profesionales/profesionales-routing.module';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';
import { HistorialConsultasComponent } from './modules/historial-consultas/historial-consultas.component';
import { FichaConsultaComponent } from './modules/ficha-consulta/ficha-consulta.component';

import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MisPacientesComponent } from './modules/mis-pacientes/mis-pacientes.component';
import { AgendaComponent } from './modules/agenda/agenda.component';
import { CrearFichaConsultaComponent } from './modules/crear-ficha-consulta/crear-ficha-consulta.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);

@NgModule({
  declarations: [
    FichaPacienteComponent,
    PacientesComponent,
    InicioPComponent,
    MiDisponibilidadComponent,
    HistorialConsultasComponent,
    FichaConsultaComponent,
    MisPacientesComponent,
    AgendaComponent,
    CrearFichaConsultaComponent,
  ],
  imports: [
    CommonModule,
    ProfesionalesRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    OwlModule,
    VerticalTimelineModule,
    NgbPaginationModule,
    NgbRatingModule,
  ],
  exports: [FichaPacienteComponent, InicioPComponent, MiDisponibilidadComponent],
})
export class ProfesionalesModule {}

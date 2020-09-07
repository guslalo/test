import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

// import interactionPlugin from '@fullcalendar/angular/fullcalendar-angular'; // a plugin

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

//
import { OwlModule } from 'ngx-owl-carousel';

// components
import { FichaPacienteComponent } from './modules/ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { ProfesionalesRoutingModule } from '../profesionales/profesionales-routing.module';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';

import { FichaConsultaComponent } from './modules/ficha-consulta/ficha-consulta.component';

import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { MisPacientesComponent } from './modules/mis-pacientes/mis-pacientes.component';
import { AgendaComponent } from './modules/agenda/agenda.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  // interactionPlugin
]);

@NgModule({
  declarations: [
    FichaPacienteComponent,
    PacientesComponent,
    InicioPComponent,
    MiDisponibilidadComponent,
    FichaConsultaComponent,
    MisPacientesComponent,
    AgendaComponent
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
    NgbTimepickerModule,
    NgxDatatableModule,
    NgxSpinnerModule,
  ],
  exports: [
    NgbTimepickerModule,
    FichaPacienteComponent,
    InicioPComponent,
    MiDisponibilidadComponent,
    NgxDatatableModule,
    NgxSpinnerModule,
    NgbDatepickerModule
  ]
})
export class ProfesionalesModule {}

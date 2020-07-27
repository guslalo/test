import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin

//import interactionPlugin from '@fullcalendar/angular/fullcalendar-angular'; // a plugin


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

//
import { OwlModule } from 'ngx-owl-carousel';

//components
import { FichaPacienteComponent } from './ficha-paciente/ficha-paciente.component';
import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { ProfesionalesRoutingModule } from '../profesionales/profesionales-routing.module';
import { InicioPComponent } from '../profesionales/inicio/inicio.component';
import { MiDisponibilidadComponent } from './modules/mi-disponibilidad/mi-disponibilidad.component';
import { HistorialConsultasComponent } from './modules/historial-consultas/historial-consultas.component';
import { FichaConsultaComponent } from './modules/ficha-consulta/ficha-consulta.component';

import { VerticalTimelineModule } from 'angular-vertical-timeline';




FullCalendarModule.registerPlugins([ // register FullCalendar plugins
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
    FichaConsultaComponent
  ],
  imports: [
    CommonModule,
    ProfesionalesRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgxMaterialTimepickerModule,
    OwlModule,
    VerticalTimelineModule
  ],
  exports:[
    FichaPacienteComponent,
    InicioPComponent,
    MiDisponibilidadComponent
  ]
})

export class ProfesionalesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './components/agenda.component';
import { AgendaRoutingModule } from './agenda-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { NgbRatingModule, NgbTab, NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTimepickerModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  // interactionPlugin
]);



@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,

    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbRatingModule,
    NgbTimepickerModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbToastModule,
    NgxDatatableModule,
    NgxSpinnerModule
  ]
})
export class AgendaModule { }

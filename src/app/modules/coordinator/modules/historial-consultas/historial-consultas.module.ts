import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialConsultasRoutingModule } from './historial-consultas-routing.module';
import { IndexComponent } from './components/index/index.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    HistorialConsultasRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule
  ],
  exports: [
    NgbDatepickerModule,

  ]
})
export class HistorialConsultasModule { }

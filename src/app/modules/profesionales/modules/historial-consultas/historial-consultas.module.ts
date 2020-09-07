import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialConsultasComponent } from './components/index/historial-consultas.component';
import { HistorialConsultasRoutingModule } from './historial-consultas-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HistorialConsultasComponent
  ],
  imports: [
    CommonModule,
    HistorialConsultasRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class HistorialConsultasModule { }

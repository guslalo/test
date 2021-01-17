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
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HistorialConsultasComponent],
  imports: [
    CommonModule,
    HistorialConsultasRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class HistorialConsultasModule { }

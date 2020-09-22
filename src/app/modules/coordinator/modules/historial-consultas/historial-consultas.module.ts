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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HistorialConsultasRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgxDatatableModule,
    MatAutocompleteModule,
    TranslocoRootModule
  ],
  exports: [NgbDatepickerModule],
})
export class HistorialConsultasModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisponibilidadRoutingModule } from './disponibilidad-routing.module';
import { IndexComponent } from './components/index/index.component';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTimepickerModule,
  NgbNavModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    DisponibilidadRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    NgxDatatableModule,
    MatAutocompleteModule,
    TranslocoRootModule,
  ],
})
export class DisponibilidadModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { IndexComponent } from './components/index/index.component';
import { FichaPacienteComponent } from './components/ficha-paciente/ficha-paciente.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTimepickerModule,
  NgbNavModule,
  NgbToastModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [IndexComponent, FichaPacienteComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgbNavModule,
    NgbToastModule,
    NgbDropdownModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoRootModule,
  ],
})
export class PacientesModule {}

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
import { TeleconsultaComponent } from '../teleconsulta/components/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateAppointmentComponent } from 'src/app/shared/modules/create-appointment/create-appointment.component';

@NgModule({
  declarations: [IndexComponent, TeleconsultaComponent, CreateAppointmentComponent],
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
    TranslocoRootModule,
  ],
  exports: [NgbDatepickerModule]
})
export class HistorialConsultasModule { }

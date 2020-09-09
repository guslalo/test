import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionSalasRountingModule } from './gestionSalas-routing.module';
import { IndexComponent } from './components/index/index.component';
import { EditarSalaComponent } from './components/editar-sala/editar-sala.component';
import { VerSalaComponent } from './components/index/ver-sala.component';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent, EditarSalaComponent, VerSalaComponent],
  imports: [
    CommonModule,
    FormsModule,
    GestionSalasRountingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgxDatatableModule,
    NgxSpinnerModule,
  ],
})
export class GestionSalasModule {}

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [IndexComponent, EditarSalaComponent, VerSalaComponent],
  imports: [
    CommonModule,
    FormsModule,
    GestionSalasRountingModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    TranslocoRootModule
  ],
})
export class GestionSalasModule { }

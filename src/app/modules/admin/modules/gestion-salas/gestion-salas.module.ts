import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionSalasRountingModule } from './gestionSalas-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    GestionSalasRountingModule,
    NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule
  ]
})
export class GestionSalasModule { }

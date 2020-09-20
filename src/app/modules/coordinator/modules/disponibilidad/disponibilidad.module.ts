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
  NgbNavModule
} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    DisponibilidadRoutingModule,
    ReactiveFormsModule, FormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTimepickerModule,
    NgbNavModule,
  ]
})
export class DisponibilidadModule { }

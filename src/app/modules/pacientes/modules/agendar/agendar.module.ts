import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarRoutingModule } from './agendar-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SafePipe } from './../../../../shared/pipes/sanitizer.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { IdPipe } from './pipes/id.pipe';

@NgModule({
  declarations: [IndexComponent, ResultadoComponent, SafePipe, IdPipe],
  imports: [
    CommonModule,
    AgendarRoutingModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    SharedModule,
  ],
  exports: [SafePipe],
})
export class AgendarModule {}

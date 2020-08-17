import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarRoutingModule } from './agendar-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoComponent } from './components/resultado/resultado.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IndexComponent, ResultadoComponent],
  imports: [
    CommonModule,
    AgendarRoutingModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgendarModule { }

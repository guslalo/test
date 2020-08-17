import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarRoutingModule } from './agendar-routing.module';
import { IndexComponent } from './components/index/index.component';
<<<<<<< HEAD
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultadoComponent } from './components/resultado/resultado.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
=======
import { ResultadoComponent } from './components/resultado/resultado.component';

>>>>>>> 60b5d6467aec93ed30a545548bb160c5618bbae1


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

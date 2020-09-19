import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }

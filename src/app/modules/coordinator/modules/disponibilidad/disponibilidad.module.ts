import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisponibilidadRoutingModule } from './disponibilidad-routing.module';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    DisponibilidadRoutingModule
  ]
})
export class DisponibilidadModule { }

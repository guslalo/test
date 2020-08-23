import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisConsultasRoutingModule } from './mis-consultas-routing.module';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';


@NgModule({
  declarations: [
    MisConsultasComponent
  ],
  imports: [
    CommonModule,
    MisConsultasRoutingModule
  ]
})
export class MisConsultasModule { }

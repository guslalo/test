import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisConsultasRoutingModule } from './mis-consultas-routing.module';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ConsultaComponent } from './components/consulta/consulta.component';


@NgModule({
  declarations: [
    MisConsultasComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    MisConsultasRoutingModule
  ]
})
export class MisConsultasModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaConsultaComponent } from './components/ficha-consulta.component';
import { FichaConsultaRoutingModule } from './ficha-consulta-routing.module';


@NgModule({
  declarations: [
    FichaConsultaComponent
  ],
  imports: [
    CommonModule,
    FichaConsultaRoutingModule
  ]
})
export class FichaConsultaModule { }

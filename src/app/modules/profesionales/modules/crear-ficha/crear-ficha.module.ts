import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearFichaConsultaComponent } from './components/crear-ficha-consulta/crear-ficha-consulta.component';
import { CrearFichaRoutingModule } from './crear-ficha-routing.module';


@NgModule({
  declarations: [
    CrearFichaConsultaComponent
  ],
  imports: [
    CommonModule ,
    CrearFichaRoutingModule
  ]
})
export class CrearFichaModule { }

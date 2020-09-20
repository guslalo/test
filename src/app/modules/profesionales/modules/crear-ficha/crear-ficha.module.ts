import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearFichaConsultaComponent } from './components/crear-ficha-consulta/crear-ficha-consulta.component';
import { CrearFichaRoutingModule } from './crear-ficha-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CrearFichaConsultaComponent
  ],
  imports: [
    CommonModule ,
    CrearFichaRoutingModule,
    ReactiveFormsModule, FormsModule,
    NgxSpinnerModule
  ]
})
export class CrearFichaModule { }

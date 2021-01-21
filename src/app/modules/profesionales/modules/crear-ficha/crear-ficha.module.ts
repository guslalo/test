import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearFichaConsultaComponent } from './components/crear-ficha-consulta/crear-ficha-consulta.component';
import { CrearFichaRoutingModule } from './crear-ficha-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from 'src/app/shared/shared.module';
import { FichaHistorialComponent } from './components/ficha-historial/ficha-historial.component';
import { JsonPathFinderPipe } from 'src/app/pipes/json-path-finder.pipe';
import { AngularResizeElementModule } from 'angular-resize-element';


@NgModule({
  declarations: [
    CrearFichaConsultaComponent,
    FichaHistorialComponent,
    JsonPathFinderPipe,
  ],
  imports: [
    CommonModule,
    CrearFichaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    SharedModule,
    AngularResizeElementModule
  ],
})
export class CrearFichaModule { }

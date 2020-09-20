import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    TranslocoRootModule
  ]
})
export class PacientesModule { }

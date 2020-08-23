import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiSaludRoutingModule } from './mi-salud-routing.module';
import { MiSaludComponent } from './components/mi-salud/mi-salud.component';


@NgModule({
  declarations: [
    MiSaludComponent
  ],
  imports: [
    CommonModule,
    MiSaludRoutingModule
  ]
})
export class MiSaludModule { }

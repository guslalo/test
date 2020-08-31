import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoporteRoutingModule } from './soporte-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SoporteComponent } from './components/soporte/soporte.component';


@NgModule({
  declarations: [
    IndexComponent,
    SoporteComponent
  ],
  imports: [
    CommonModule,
    SoporteRoutingModule
  ]
})
export class SoporteModule { }

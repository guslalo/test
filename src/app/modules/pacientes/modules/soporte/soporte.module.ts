import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoporteRoutingModule } from './soporte-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    SoporteComponent
  ],
  imports: [
    CommonModule,
    SoporteRoutingModule,
    SharedModule.forRoot()
  ]
})
export class SoporteModule { }

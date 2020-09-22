import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaRoutingModule } from './ficha-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FichaRoutingModule,
    SharedModule.forRoot()
  ]
})
export class FichaModule { }

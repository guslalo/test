import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaEsperaRoutingModule } from './sala-espera-routing.module';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    SalaEsperaRoutingModule
  ]
})
export class SalaEsperaModule { }

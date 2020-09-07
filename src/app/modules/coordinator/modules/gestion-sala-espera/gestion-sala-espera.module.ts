import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionSalaEsperaRoutingModule } from './gestion-sala-espera-routing.module';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    GestionSalaEsperaRoutingModule
  ]
})
export class GestionSalaEsperaModule { }

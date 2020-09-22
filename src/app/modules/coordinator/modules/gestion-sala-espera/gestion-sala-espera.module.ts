import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionSalaEsperaRoutingModule } from './gestion-sala-espera-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, GestionSalaEsperaRoutingModule, SharedModule],
})
export class GestionSalaEsperaModule {}

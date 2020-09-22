import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleconsultaRoutingModule } from './teleconsulta-routing.module';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, TeleconsultaRoutingModule],
})
export class TeleconsultaModule {}

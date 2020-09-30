import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleconsultaRoutingModule } from './teleconsulta-routing.module';
import { TeleconsultaComponent } from './components/index/index.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [TeleconsultaComponent],
  imports: [CommonModule, TeleconsultaRoutingModule, TranslocoRootModule],
})
export class TeleconsultaModule {}

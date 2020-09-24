import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaConsultaComponent } from './components/ficha-consulta.component';
import { FichaConsultaRoutingModule } from './ficha-consulta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [FichaConsultaComponent],
  imports: [CommonModule, FichaConsultaRoutingModule, SharedModule, NgxSpinnerModule],
})
export class FichaConsultaModule {}

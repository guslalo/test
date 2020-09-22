import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgendarConsultaInmediataRoutingModule } from './agendar-consulta-inmediata-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [IndexComponent, ResultadoComponent],
  imports: [
    CommonModule,
    AgendarConsultaInmediataRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    TranslocoRootModule,
  ],
})
export class AgendarConsultaInmediataModule {}

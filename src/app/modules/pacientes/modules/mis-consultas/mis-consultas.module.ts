import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisConsultasRoutingModule } from './mis-consultas-routing.module';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [MisConsultasComponent, ConsultaComponent],
  imports: [
    TranslocoRootModule,
    CommonModule,
    MisConsultasRoutingModule,
    NgbPaginationModule,
    NgxPaginationModule,
    SharedModule,
    NgxSpinnerModule
  ],
})
export class MisConsultasModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaEsperaRoutingModule } from './sala-espera-routing.module';
import { IndexComponent } from './components/index/index.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VerSalaComponent } from './components/index/ver-sala.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IndexComponent, VerSalaComponent],
  imports: [CommonModule, FormsModule, SalaEsperaRoutingModule, NgxDatatableModule, SharedModule],
})
export class SalaEsperaModule {}

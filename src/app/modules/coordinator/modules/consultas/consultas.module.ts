import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    TranslocoRootModule,
    SharedModule
  ],
  exports : [
    SharedModule
  ]
})

export class ConsultasModule { }

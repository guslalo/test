import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendarRoutingModule } from './agendar-routing.module';
import { IndexComponent } from './components/index/index.component';
import { ResultadoComponent } from './components/resultado/resultado.component';



@NgModule({
  declarations: [IndexComponent, ResultadoComponent],
  imports: [
    CommonModule,
    AgendarRoutingModule
  ]
})
export class AgendarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgendarConsultaInmediataRoutingModule } from './agendar-consulta-inmediata-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AgendarConsultaInmediataRoutingModule,
    ReactiveFormsModule, FormsModule,
    NgxSpinnerModule 
  ]
})
export class AgendarConsultaInmediataModule { }

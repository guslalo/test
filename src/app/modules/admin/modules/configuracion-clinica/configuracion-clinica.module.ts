import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionClinicaRoutingModule } from './configuracion-clinica-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditModalityComponent } from './components/edit-modality/edit-modality.component';


@NgModule({
  declarations: [IndexComponent, EditModalityComponent],
  imports: [
    CommonModule,
    ConfiguracionClinicaRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class ConfiguracionClinicaModule { }

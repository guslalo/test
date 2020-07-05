import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { PacientesComponent } from './pacientes/pacientes.component';
import { MiSaludComponent } from './mi-salud/mi-salud.component';
import { InicioComponent } from './inicio/inicio.component';

import { PacientesRoutingModule } from '../pacientes/pacientes-routing.module';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { WebcamModule } from 'ngx-webcam';

import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from '../../services/opentok.service';



@NgModule({
  declarations: [
    PublisherComponent,
    SubscriberComponent,
    /*PacientesComponent, MiSaludComponent*/InicioComponent, MisConsultasComponent, ConsultaComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    WebcamModule
  ],
  exports: [
    WebcamModule
  ],
  providers: [
    OpentokService
  ]
})
export class PacientesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { PacientesComponent } from './pacientes/pacientes.component';


import { PacientesRoutingModule } from '../pacientes/pacientes-routing.module';

import { ConsultaComponent } from './consulta/consulta.component';
import { Consulta2Component } from './consulta2/consulta2.component';

import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from '../../services/opentok.service';

import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { MisConsultasFilterComponent } from './mis-consultas-filter/mis-consultas-filter.component';
import { AgendarComponent } from './components/modals/agendar/agendar.component';


    //ConsultaComponent,
@NgModule({
  declarations: [
    PublisherComponent,
    SubscriberComponent,
    Consulta2Component,
    CambiarClaveComponent,
    MisConsultasFilterComponent,
    AgendarComponent
  ],
  imports: [CommonModule, PacientesRoutingModule],
  exports: [
    AgendarComponent
  ],
  providers: [OpentokService],
})
export class PacientesModule {}

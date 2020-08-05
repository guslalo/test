import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { PacientesComponent } from './pacientes/pacientes.component';
import { MiSaludComponent } from './mi-salud/mi-salud.component';
import { InicioComponent } from './inicio/inicio.component';

import { PacientesRoutingModule } from '../pacientes/pacientes-routing.module';
import { MisConsultasComponent } from './mis-consultas/mis-consultas.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { Consulta2Component } from './consulta2/consulta2.component';

import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from '../../services/opentok.service';
import { PerfilComponent } from './perfil/perfil.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { SoporteComponent } from './soporte/soporte.component';
import { MisConsultasFilterComponent } from './mis-consultas-filter/mis-consultas-filter.component';

@NgModule({
  declarations: [
    PublisherComponent,
    SubscriberComponent,

    /*PacientesComponent, MiSaludComponent*/ InicioComponent,
    MisConsultasComponent,
    ConsultaComponent,
    Consulta2Component,
    PerfilComponent,
    CambiarClaveComponent,
    SoporteComponent,
    MisConsultasFilterComponent,
  ],
  imports: [CommonModule, PacientesRoutingModule],
  exports: [],
  providers: [OpentokService],
})
export class PacientesModule {}

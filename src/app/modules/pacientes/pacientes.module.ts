//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//routing
import { PacientesRoutingModule } from '../pacientes/pacientes-routing.module';

//modules
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

//components
import { ConsultaComponent } from './consulta/consulta.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { AgendarComponent } from './components/modals/agendar/agendar.component';

@NgModule({
  declarations: [
    CambiarClaveComponent,
    AgendarComponent,
    ConsultaComponent
  ],
  imports: [CommonModule, PacientesRoutingModule, SharedModule, TranslocoRootModule],
  exports: [AgendarComponent],
  providers: []
})

export class PacientesModule {}

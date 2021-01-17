import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { InmediateAppointmentGuard } from '../../../../guards/inmediateAppointment.guard';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [InmediateAppointmentGuard] },
  { path: 'resultado-cita/:appointmentId', component: ResultadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarConsultaInmediataRoutingModule {}

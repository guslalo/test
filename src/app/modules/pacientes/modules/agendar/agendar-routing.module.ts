// core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { ScheduleAppointmentGuard } from '../../../../guards/scheduleAppointment.guard';
// components

// routing

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [ScheduleAppointmentGuard] },
  { path: 'resultado/:appointmentId', component: ResultadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialConsultasComponent } from './components/index/historial-consultas.component';

const routes: Routes = [{ path: '', component: HistorialConsultasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialConsultasRoutingModule {}

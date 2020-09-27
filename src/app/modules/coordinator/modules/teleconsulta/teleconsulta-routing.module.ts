import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeleconsultaComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: TeleconsultaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeleconsultaRoutingModule {}

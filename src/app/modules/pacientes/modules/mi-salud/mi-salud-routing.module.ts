import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiSaludComponent } from './components/mi-salud/mi-salud.component';

const routes: Routes = [{ path: '', component: MiSaludComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiSaludRoutingModule {}

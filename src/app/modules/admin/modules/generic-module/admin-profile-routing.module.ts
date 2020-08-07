//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProfileRoutingModule {}

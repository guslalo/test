//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { LayoutComponent } from '../layout/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [],
    children: [
      // { path: '', component:  InicioPComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

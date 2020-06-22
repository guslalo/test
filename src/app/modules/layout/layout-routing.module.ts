import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

import { PacientesComponent } from '../profesionales/pacientes/pacientes.component';
import { GuardsGuard} from '../../guards/guards.guard'



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: '', component:  PacientesComponent }
    ]
  }
  
];

const routes2: Routes = [
  {
    path: 'DOS',
    component: LayoutComponent,
    canActivate: [GuardsGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule,  } from '@angular/router';
//components
//import { LayoutComponent } from './components/layout/layout.component';

//import { MiSaludComponent } from './mi-salud/mi-salud.component';
//guards

//import { InicioPComponent } from '../profesionales/inicio/inicio.component';


//routing


const routes: Routes = [
  {
    path: '',
   // component: LayoutComponent,
     canActivate: [],
    children: [
     // { path: '', component:  InicioPComponent }
    ]
  } 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

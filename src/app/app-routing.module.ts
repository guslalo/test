import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
  path: '',
  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },/**/
  {
    path: 'index',
    loadChildren: './modules/layout/layout.module#LayoutModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

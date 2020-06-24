import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsGuard } from './guards/guards.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [GuardsGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

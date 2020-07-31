import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsGuard } from './guards/guards.guard';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy.service';

const routes: Routes = [
  {
    
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  /*
  {
    path: 'app',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [GuardsGuard]
    //data: { preload: true }
    //canLoad: [AuthGuard]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //, { preloadingStrategy: SelectivePreloadingStrategyService }
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
<<<<<<< Updated upstream
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
=======
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }/*,
  {
    path: 'app-professional',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    canActivate: []
    //data: { preload: true }
    //canLoad: [AuthGuard]
>>>>>>> Stashed changes
  },
  {
<<<<<<< Updated upstream
    path: '',
=======
    path: 'app-patient',
>>>>>>> Stashed changes
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    canActivate: []
    //data: { preload: true }
    //canLoad: [AuthGuard]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) // { enableTracing: true }

    // , { preloadingStrategy: SelectivePreloadingStrategyService }
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from 'src/app/shared/modules/mi-perfil/mi-perfil.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'historial-consultas',
    loadChildren: () =>
      import('./modules/historial-consultas/historial-consultas.module').then((m) => m.HistorialConsultasModule),
  },
  {
    path: 'agenda',
    loadChildren: () => import('./modules/agenda/agenda.module').then((m) => m.AgendaModule),
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./modules/pacientes/pacientes.module').then((m) => m.PacientesModule),
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./modules/soporte/soporte.module').then((m) => m.SoporteModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorRoutingModule {}

//core angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexAgendaComponent } from './components/index-agenda/index-agenda.component';
//import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexAgendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaRoutingModule {}

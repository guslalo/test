import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda-routing.module';
import { IndexAgendaComponent } from './components/index-agenda/index-agenda.component';
import { SharedModule } from './../../../../shared/shared.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin

@NgModule({
  declarations: [IndexAgendaComponent],
  imports: [CommonModule, AgendaRoutingModule, SharedModule, TranslocoRootModule],
})
export class AgendaModule {}

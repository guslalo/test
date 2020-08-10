import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgendaModule } from './modules/agenda/agenda.module';
//import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxChartsModule,
    AgendaModule
    //SharedModule
  ],
  exports:[
    NgxChartsModule
    //AgendaModule
    //SharedModule
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//import { AdminProfilesModule} from './modules/admin-profiles/admin-profiles.module';
import { AgendaModule } from './modules/agenda/agenda.module';
//import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,

    AgendaModule,
    //SharedModule
  ],
  exports:[
    //AgendaModule
    //SharedModule
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from '../admin/admin-routing.module';
//import { SharedModule } from './../../shared/shared.module';

//child modules
import { AdminProfilesModule} from './modules/admin-profiles/admin-profiles.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AdminRoutingModule,
    AdminProfilesModule,
    //SharedModule
  ],
  exports:[
    //SharedModule
  ],
})
export class AdminModule {}

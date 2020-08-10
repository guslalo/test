import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { AdminProfilesModule} from './modules/admin-profiles/admin-profiles.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgendaModule } from './modules/agenda/agenda.module';
//import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';

import { NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// SHARED
import { SharedModule } from './../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    SharedModule.forRoot(),
    CommonModule,
    AgendaModule,
    AdminRoutingModule,
    FormsModule, //aca
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    MatDialogModule, //aca
    AdminRoutingModule,
    NgxChartsModule,
    AgendaModule,
    //SharedModule
  ],
  exports: [
    NgxChartsModule,
    //AgendaModule
    //SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}

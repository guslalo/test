import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTES
import { AdminRoutingModule } from '../admin/admin-routing.module';

// EXTRAS
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

// SHARED
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule.forRoot(),
    CommonModule,
    AdminRoutingModule,
    // EXTRAS
    NgxChartsModule,
    NgbTypeaheadModule,
  ],
  exports: [NgxChartsModule, NgbTypeaheadModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}

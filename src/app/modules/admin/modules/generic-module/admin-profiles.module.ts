import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    SharedModule
  ]
})

export class AdminProfilesModule { }

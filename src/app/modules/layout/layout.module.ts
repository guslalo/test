import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { LayoutComponent } from './components/layout/layout.component';
import { ProfesionalesModule } from '../profesionales/profesionales.module';

//routing
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProfesionalesModule
  ]
})
export class LayoutModule { }

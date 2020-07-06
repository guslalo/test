import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { LayoutComponent } from './components/layout/layout.component';
import { ProfesionalesModule } from '../profesionales/profesionales.module';
import { PacientesModule } from '../pacientes/pacientes.module';

//import { SharedModule } from '../../shared/shared.module';
import { TourMatMenuModule } from 'ngx-tour-md-menu';

//routing
import { LayoutRoutingModule } from './layout-routing.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProfesionalesModule,
    PacientesModule,
    TourMatMenuModule.forRoot()
    //SharedModule
  ],
  exports:[
    //TourMatMenuModule.forRoot()
  ]
})
export class LayoutModule { }

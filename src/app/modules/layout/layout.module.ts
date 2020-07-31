import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { LayoutComponent } from './components/layout/layout.component';
import { ProfesionalesModule } from '../profesionales/profesionales.module';
import { PacientesModule } from '../pacientes/pacientes.module';

import { SharedModule } from '../../shared/shared.module';
import { TourMatMenuModule } from 'ngx-tour-md-menu';

//routing
import { LayoutRoutingModule } from './layout-routing.module';


//inteceptores
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './../../modules/auth/interceptor.service';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProfesionalesModule,
    PacientesModule,
    TourMatMenuModule.forRoot(),
    SharedModule
  ],
  exports:[
    //TourMatMenuModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthTokenInterceptor, 
    multi: true
  }]
})
export class LayoutModule { }

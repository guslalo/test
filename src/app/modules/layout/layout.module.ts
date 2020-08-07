import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//modules
import { LayoutComponent } from './components/layout/layout.component';
import { ProfesionalesModule } from '../profesionales/profesionales.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { AdminModule } from '../admin/admin.module';
import { SharedModule } from '../../shared/shared.module';

//routing
import { LayoutRoutingModule } from './layout-routing.module';

//inteceptores
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './../../modules/auth/interceptor.service';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutRoutingModule,
    AdminModule,
    ProfesionalesModule,
    PacientesModule,
    SharedModule,
  ],
  exports: [
    SharedModule
    //TourMatMenuModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
})
export class LayoutModule {}

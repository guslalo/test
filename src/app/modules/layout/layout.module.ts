import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// modules
import { LayoutComponent } from './components/layout/layout.component';
import { ProfesionalesModule } from '../profesionales/profesionales.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { AdminModule } from '../admin/admin.module';
import { SharedModule } from '../../shared/shared.module';

// routing
import { LayoutRoutingModule } from './layout-routing.module';

// inteceptores
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../shared/interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { LegalsComponent } from './components/legals/legals.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, LegalsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutRoutingModule,
    AdminModule,
    ProfesionalesModule,
    PacientesModule,
    SharedModule,
  ],
  exports: [SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule {}

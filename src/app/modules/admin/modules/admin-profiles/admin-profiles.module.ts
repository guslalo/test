import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';


@NgModule({
  declarations: [IndexComponent, CrearPerfilComponent],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    SharedModule
  ]
})

export class AdminProfilesModule { }

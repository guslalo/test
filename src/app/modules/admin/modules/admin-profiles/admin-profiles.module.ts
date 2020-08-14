import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { IndexProfileComponent } from './components/indexProfile/indexProfile.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';


@NgModule({
  declarations: [
    IndexProfileComponent, 
    CrearPerfilComponent, EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    SharedModule
  ]
})

export class AdminProfilesModule { }

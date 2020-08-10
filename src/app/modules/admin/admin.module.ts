import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { AdminProfilesModule} from './modules/admin-profiles/admin-profiles.module';
import { AgendaModule } from './modules/agenda/agenda.module';
//import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearUsuarioComponent } from './modules/crear-usuario/crear-usuario.component';
// SHARED
import { SharedModule } from './../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [UsuariosComponent, CrearUsuarioComponent],
  imports: [
    SharedModule.forRoot(),
    CommonModule,
    AgendaModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    MatDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}

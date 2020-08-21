import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRountingModule } from '../usuarios/usuarios-routing.module';
// ADMIN ROUTES
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

// SHARED
import { SharedModule } from '../../../../shared/shared.module';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';

// EXTRAS
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [UsuariosComponent, CrearUsuarioComponent, EditarUsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRountingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    MatDialogModule,
    NgxDatatableModule,
  ],
})
export class UsuariosModule {}

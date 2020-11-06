import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRountingModule } from '../usuarios/usuarios-routing.module';
// ADMIN ROUTES
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbDropdown,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

// SHARED
import { SharedModule } from '../../../../shared/shared.module';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';

// EXTRAS
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
// import { NgxPermissionsModule } from 'ngx-permissions';

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
    NgbDropdownModule,
    MatDialogModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    TranslocoRootModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
    // NgxPermissionsModule
  ],
})
export class UsuariosModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgbDatepickerModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { PerfilComponent } from './mi-perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, MiPerfilRoutingModule, ReactiveFormsModule, FormsModule, NgxSpinnerModule],
})
export class MiPerfilModule {}

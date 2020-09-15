import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { IndexComponent } from './components/index/index.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class MiPerfilModule { }

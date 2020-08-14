import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component'
import { IndexRoutingModule } from './index-routing.module';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }

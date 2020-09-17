import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
import { IndexRoutingModule } from './index-routing.module';
import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    OwlModule
  ]
})
export class IndexModule { }

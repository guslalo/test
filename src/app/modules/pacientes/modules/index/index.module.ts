import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
import { IndexRoutingModule } from './index-routing.module';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, IndexRoutingModule, OwlModule, SharedModule],
})
export class IndexModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartsComponent } from './components/pie-charts/pie-charts.component';


@NgModule({
  declarations: [IndexComponent, PieChartsComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }

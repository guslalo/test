import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { IndexRoutingModule } from './index-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartsComponent } from './components/pie-charts/pie-charts.component';


@NgModule({
  declarations: [IndexComponent, PieChartsComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgxChartsModule
  ]
})
export class IndexModule { }

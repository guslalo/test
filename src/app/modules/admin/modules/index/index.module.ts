import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartsComponent } from './components/pie-charts/pie-charts.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [IndexComponent, PieChartsComponent],
  imports: [CommonModule, NgxChartsModule, IndexRoutingModule, TranslocoRootModule],
})
export class IndexModule {}

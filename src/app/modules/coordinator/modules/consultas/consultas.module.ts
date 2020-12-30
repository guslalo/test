import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'  



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    TranslocoRootModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  exports : [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ]
})

export class ConsultasModule { }

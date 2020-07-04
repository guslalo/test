import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

//Translation

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslocoRootModule } from './../transloco-root.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  exports: [
    //TranslateModule,
    TranslocoRootModule
  ]
})


export class SharedModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      //providers: []TranslocoRootModule
    };
  }
 }

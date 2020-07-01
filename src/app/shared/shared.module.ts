import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  exports: [

  ]
})


export class SharedModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      //providers: [SharedModule]
    };
  }
 }

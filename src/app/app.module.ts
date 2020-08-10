//core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//routing
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
//import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { AuthModule } from './modules/auth/auth.module';

//components
import { AppComponent } from './app.component';
import { ErrorDialogService } from './modules/auth/services/error-dialog/error-dialog.service';
import { AuthTokenInterceptor } from './modules/auth/interceptor.service';
import { ErrorDialogComponent } from './modules/auth/services/error-dialog/error-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ErrorDialogComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    RouterModule,
    //SharedModule.forRoot()
    // EXTRAS
  ],
  providers: [ErrorDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent],
})
export class AppModule {}

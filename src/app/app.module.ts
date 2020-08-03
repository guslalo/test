//core
import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//routing
import { AppRoutingModule } from './app-routing.module';

//import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './modules/layout/layout.module';
import { AuthModule } from './modules/auth/auth.module';




//components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule
  
 
    //SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

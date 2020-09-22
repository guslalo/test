// core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
// routing
import { AppRoutingModule } from './app-routing.module';

import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { AuthModule } from './modules/auth/auth.module';

// components
import { AppComponent } from './app.component';
import { MessagingService } from './services/messaging.service';

// Firebase library to be imported
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase, FirebaseObjectObservable } from '@angular/fire/database-deprecated';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AsyncPipe } from '@angular/common';
import { environment } from './../environments/environment';
import { FileUtilsService } from './services/file-utils.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpToastrInterceptor } from './interceptors/http-toastr.interceptor';
import { ToastrModule } from 'ngx-toastr';

const toastrConfig = { closeButton: true };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    RouterModule,
    AngularFireModule,
    AngularFireMessagingModule,
    // SharedModule
    // EXTRAS
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // For FireStore
    AngularFireStorageModule, // For Storage
    AngularFireAuthModule, // For Authentication
    ModalModule.forRoot(),
    ToastrModule.forRoot(toastrConfig),
  ],
  providers: [
    AngularFireDatabaseModule,
    MessagingService,
    AsyncPipe,
    FileUtilsService,
    // INTERCEPTOR TOASTR
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpToastrInterceptor,
      multi: true,
    },
    // INTERCEPTOR TOASTR
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}

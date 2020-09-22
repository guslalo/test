// core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
// routing
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
// import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { AuthModule } from './modules/auth/auth.module';

// components
import { AppComponent } from './app.component';
import { ErrorDialogService } from './shared/error-dialog/error-dialog.service';


import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
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

@NgModule({
  declarations: [AppComponent, ErrorDialogComponent],
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
    // SharedModule.forRoot()
    // EXTRAS
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // For FireStore
    AngularFireStorageModule, // For Storage
    AngularFireAuthModule, // For Authentication
    ModalModule.forRoot()
  ],
  providers: [AngularFireDatabaseModule, ErrorDialogService, MessagingService, AsyncPipe, FileUtilsService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent],
  exports: [
   
  ]
})
export class AppModule { }

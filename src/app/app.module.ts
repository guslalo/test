// core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { BnNgIdleService } from 'bn-ng-idle';
import { CustomDatepickerI18n, NgbCustomDateParserFormatter } from './shared/ngb-datepicker-formatter';
import { TranslocoService } from '@ngneat/transloco';
import { initializeApp } from 'firebase/app';

const toastrConfig = {
  closeButton: true,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
};

initializeApp(environment.firebase);
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
    ToastrModule.forRoot(toastrConfig)
  ],
  providers: [
    AngularFireDatabaseModule,
    MessagingService,
    AsyncPipe,
    FileUtilsService,
    TranslocoService,
    // DATEPICKER FORMATTER
    {
      provide: NgbDateParserFormatter,
      useValue: new NgbCustomDateParserFormatter('DD/MM/YYYY'),
    },
    // DATEPICKER TRANSLATION
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    // INTERCEPTOR TOASTR
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpToastrInterceptor,
      multi: true,
    },
    // INTERCEPTOR SESSION IDDLE TIME
    BnNgIdleService,
  ],
  bootstrap: [AppComponent],
  exports: [
  ],
})
export class AppModule {}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTimepickerBasic } from './timepicker-basic';


//Translation

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslocoRootModule } from './../transloco-root.module';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    OnboardingComponent,
    NgbdTimepickerBasic
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslocoRootModule,
    TourMatMenuModule.forRoot(),
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    RouterModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgbTimepickerModule
    
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    OnboardingComponent,
    TranslocoRootModule,
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    RouterModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbdTimepickerBasic
  ],
  bootstrap: [NgbdTimepickerBasic]
})


export class SharedModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      //providers: []TranslocoRootModule
    };
  }
 }

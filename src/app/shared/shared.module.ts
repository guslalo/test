import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';


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
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoRootModule,
    TourMatMenuModule.forRoot(),
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    RouterModule,
    NgbDatepickerModule,
    NgbTimepickerModule
    
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    OnboardingComponent,
    TranslocoRootModule,
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    RouterModule,
    NgbDatepickerModule,
    NgbTimepickerModule
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

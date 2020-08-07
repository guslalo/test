import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//import { HttpClientModule, HttpClient } from '@angular/common/http';

import { 
  NgbTypeaheadModule,
  NgbDatepickerModule,
   NgbTimepickerModule, 
   NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTimepickerBasic } from './timepicker-basic';

//Translation
import { TranslocoRootModule } from './../transloco-root.module';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//modulos terceros
import { PasswordStrengthMeterModule } from './modules/password-strength/password-strength-meter.module';

//components
import { ChangePassComponent } from './modules/change-pass/change-pass.component';

@NgModule({
  declarations: [
    NgbdTimepickerBasic, 
    ChangePassComponent],
  imports: [
    CommonModule,
    //HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslocoRootModule,
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    RouterModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbRatingModule,
    PasswordStrengthMeterModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    TranslocoRootModule,
    MatSnackBarModule,
    MatSliderModule,
    MatCardModule,
    RouterModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbdTimepickerBasic,
    NgbRatingModule,
    ChangePassComponent,
    PasswordStrengthMeterModule,
  ],
  bootstrap: [NgbdTimepickerBasic],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      //providers: []TranslocoRootModule
    };
  }
}

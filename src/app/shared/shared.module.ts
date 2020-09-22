import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

// import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbTypeaheadModule, NgbDatepickerModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTimepickerBasic } from './timepicker-basic';

// Translation
import { TranslocoRootModule } from './../transloco-root.module';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// modulos terceros
import { PasswordStrengthMeterModule } from './modules/password-strength/password-strength-meter.module';

// components
import { ChangePassComponent } from './modules/change-pass/change-pass.component';
import { PerfilComponent } from './modules/mi-perfil/mi-perfil.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './loaders/loader.component';

@NgModule({
  declarations: [NgbdTimepickerBasic, ChangePassComponent, PerfilComponent, LoaderComponent],
  imports: [
    CommonModule,
    // HttpClientModule,
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
    FullCalendarModule,
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
    FullCalendarModule,
    NgxSpinnerModule,
  ],
  bootstrap: [NgbdTimepickerBasic],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // providers: []TranslocoRootModule
    };
  }
}

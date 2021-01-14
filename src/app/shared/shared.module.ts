import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { NgxMaskModule } from 'ngx-mask';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

// import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbTypeaheadModule, NgbDatepickerModule, NgbRatingModule, NgbPaginationModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { PerfilCLComponent } from './modules/mi-perfil-cl/mi-perfil-cl.component';
import { LoaderComponent } from './loaders/loader.component';
import { LangComponent } from './lang/lang.component';

import { NgxPermissionsModule } from 'ngx-permissions';
import { CreateAppointmentComponent } from './modules/create-appointment/create-appointment.component';
import { RescheduleAppointmentComponent } from './modules/reschedule-appointment/reschedule-appointment.component';
import { CancelAppointmentComponent } from './modules/cancel-appointment/cancel-appointment.component';
import { RecemedPrescriptionComponent } from './modules/recemed-prescription/recemed-prescription.component';
import { RecemedProcedureComponent } from './modules/recemed-procedure/recemed-procedure.component';
import { RecemedCertificateComponent } from './modules/recemed-certificate/recemed-certificate.component';
import { RecemedExamOrderComponent } from './modules/recemed-exam-order/recemed-exam-order.component';

@NgModule({
  declarations: [NgbdTimepickerBasic, ChangePassComponent, PerfilComponent, PerfilCLComponent, LoaderComponent, LangComponent, CreateAppointmentComponent, RescheduleAppointmentComponent, CancelAppointmentComponent, RecemedPrescriptionComponent, RecemedProcedureComponent, RecemedCertificateComponent, RecemedExamOrderComponent],
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
    NgxPermissionsModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
    NgbPaginationModule,
    NgbTimepickerModule,
    MatAutocompleteModule
  ],
  exports: [
    // MODULES TO RE-USE
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
    // COMPONENTS TO RE-USE
    NgbdTimepickerBasic,
    ChangePassComponent,
    LangComponent,
    NgxPermissionsModule,
    CreateAppointmentComponent,
    RescheduleAppointmentComponent,
    CancelAppointmentComponent,
    RecemedPrescriptionComponent,
    RecemedProcedureComponent,
    RecemedCertificateComponent,
    RecemedExamOrderComponent
  ],
  bootstrap: [NgbdTimepickerBasic],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }

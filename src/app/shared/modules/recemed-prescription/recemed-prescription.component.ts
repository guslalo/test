import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AppointmentEventsService } from 'src/app/services/appointment-events.service';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'modal-recemed-prescription',
  templateUrl: './recemed-prescription.component.html',
  styleUrls: ['./recemed-prescription.component.scss']
})
export class RecemedPrescriptionComponent implements OnInit {

  public form: FormGroup;
  public appointmentId: any;
  @Output() saved = new EventEmitter();

  constructor(
    private appointmentsService: AppointmentsService,
    private appointmentEvents: AppointmentEventsService,
    private formBuilder: FormBuilder,
    private professionalService: ProfessionalService,
  ) { }

  ngOnInit(): void {
    this.makeForm()

    this.appointmentEvents
    .setAppointmentDetails$
    .subscribe((data) => {
      this.appointmentId = data._id
    })
  }

  send(){
    let payload = this.form.getRawValue()
    payload.appointmentId = this.appointmentId
    payload.documentType = 'prescription'
    this.appointmentsService.createPrescriptionRecemed(payload).subscribe((data) => {
      console.log(data)
      this.saved.emit();
    })
  }

  makeForm() {
    this.form = this.formBuilder.group({
      detail: [null, Validators.required],
      observation: [null, Validators.required],
      duration: [null],
      hold: ['', ''],
      ges: ['', ''],
    });
  }

}

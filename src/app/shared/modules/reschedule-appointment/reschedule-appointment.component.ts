import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { } from "module";
import { ModalConfig } from './modal.interface';
@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.scss']
})
export class RescheduleAppointmentComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<RescheduleAppointmentComponent>
  private modalRef: NgbModalRef
  appointmentForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}

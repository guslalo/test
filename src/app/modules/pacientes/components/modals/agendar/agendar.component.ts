import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss'],
})
export class AgendarComponent implements OnInit {
  @Input() inmediateAppointmentHijo: boolean;
  public inmediateAppointment: boolean;

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('inmediateAppointment') === 'true') {
      this.inmediateAppointment = true;
    } else {
      this.inmediateAppointment = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../services/appointments.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private appointmentsService: AppointmentsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initCall();
  }

  initCall(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.getSession(id);
    });
  }

  getSession(appointmentId: string) {
    this.appointmentsService.getAppointmentsSession(appointmentId).subscribe(
      (data) => {
        const options = {
          roomName: data.payload.sessionId,
          jwt: data.payload.sessionToken,
          height: 700,
          parentNode: document.querySelector('#meet'),
        };

        const jitsi = new (window as any).JitsiMeetExternalAPI(data.payload.urlRoom, options);
        jitsi.executeCommand('subject', 'Consulta');
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from './../../services/appointments.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IdleEventsService } from '../../../../../../services/idle-events.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  url: string;
  constructor(
    private appointmentsService: AppointmentsService,
    private route: ActivatedRoute,
    private idleEvents: IdleEventsService
  ) { }

  ngOnInit(): void {
    //this.initCall();
    this.route.params.subscribe((params) => {
      const id = params.appointmentId;
      console.log(params);
      this.getSession(id);
    });
  }

  ngOnDestroy(): void {
    this.idleEvents.inVideoCall(false)
  }

  /*
  initCall(): void {
    this.route.params.subscribe((params) => {
      const id = params.id;
      console.log(id);
      this.getSession(id);
    });
  }*/

  getSession(id: string) {
    this.appointmentsService.getAppointmentsSession(id).subscribe(
      (data) => {
        console.log(data);
        this.url = data.payload.urlRoom;
        const options = {
          roomName: data.payload.sessionId,
          jwt: data.payload.sessionToken,
          height: 700,
          parentNode: document.querySelector('#meet'),
        };

        this.url = data.payload.urlRoom.split('//');
        //console.log(environment.jitsi);
        /*
     
        console.log(this.url[1]);
        console.log(data.payload.urlRoom);*/

        const jitsi = new (window as any).JitsiMeetExternalAPI(this.url[1].replace('/', ''), options);
        jitsi.executeCommand('subject', 'Consulta');
        console.log(data);

        console.log('EN TELECONSULTA')
        this.idleEvents.inVideoCall(true)

      },
      (error) => {
        console.log(error);
      }
    );
  }
}

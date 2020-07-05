import { Component, OnInit, Input, ChangeDetectorRef  } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

session: OT.Session;
streams: Array<OT.Stream> = [];
changeDetectorRef: ChangeDetectorRef;

  constructor( 
    private ref: ChangeDetectorRef, 
    private opentokService: OpentokService,
    private router:Router,
    private appointmentsService:AppointmentsService
    ) { 
    this.changeDetectorRef = ref;
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        if(this.session){
          this.session.disconnect();
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

 

  ngOnInit(): void {
    if(this.session){
      this.session.disconnect();
    }
   
  
  }

  initCall(){
    this.getSessionCall();
  }

  getSessionCall() {
    let apiKey: any;
    let token:any;
    let sessionId:any;
    this.appointmentsService.getAppointmentsSession().subscribe(
      data =>{
        console.log(data.room);
        this.opentokService.initSession('46822534', data.room.token, data.room.sessionId).then((session: OT.Session) => {
          this.session = session;
          this.session.on('streamCreated', (event) => {
            this.streams.push(event.stream);
            this.changeDetectorRef.detectChanges();
          });
          this.session.on('streamDestroyed', (event) => {
            const idx = this.streams.indexOf(event.stream);
            if (idx > -1) {
              this.streams.splice(idx, 1);
              this.changeDetectorRef.detectChanges();
            }
          });
        })
        .then(() => this.opentokService.connect())
        .catch((err) => {
          console.error(err);
          //alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
        });
      },
      error => {
        console.log(error)
      }
    )
   }

  closeCall(){
    this.session.disconnect();
    this.router.navigate(['app/mis-consultas']);
  }


}

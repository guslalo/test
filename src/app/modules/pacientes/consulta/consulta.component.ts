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

  public apiKey = "46822534";
  public sessionId = "2_MX40NjYyMTU0Mn5-MTU5MzgwODE0NDcwMX5mQXBjTUpBNWlpQXhld1BGKytoNGhZSG9-fg";
  public token = "T1==cGFydG5lcl9pZD00NjYyMTU0MiZzaWc9NmY2OTkyNThmZjgzMDIwNjFkMmQxZWJmNDA1ODA0ZWQ1YjE4NDZhMzpzZXNzaW9uX2lkPTJfTVg0ME5qWXlNVFUwTW41LU1UVTVNemd3T0RFME5EY3dNWDVtUVhCalRVcEJOV2xwUVhobGQxQkdLeXRvTkdoWlNHOS1mZyZjcmVhdGVfdGltZT0xNTkzODA4MTU4Jm5vbmNlPTAuMzcxMjQ0MTI2MDczMTk3NTcmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NjQwMDE1OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
  
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
          alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
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

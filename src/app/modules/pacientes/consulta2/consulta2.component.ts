import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef,   } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as OT from '@opentok/client';
declare var $: any;
@Component({
  selector: 'app-consulta2',
  templateUrl: './consulta2.component.html',
  styleUrls: ['./consulta2.component.scss']
})
export class Consulta2Component implements OnInit {

session: OT.Session;
streams: Array<OT.Stream> = [];
changeDetectorRef: ChangeDetectorRef;
selectedId: any;
private sub: any;
id: number;
public meet: boolean;
@ViewChild('iniciarLlamada') iniciarLlamada;


  constructor( 
    private ref: ChangeDetectorRef, 
    private opentokService: OpentokService,
    private router:Router,
    private route: ActivatedRoute,
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
  @ViewChild('hardwareVideo') hardwareVideo: any;

  _navigator = <any> navigator;
  localStream;

 

  ngOnInit(): void {
  

    if(this.session){
      this.session.disconnect();
    }
    

    this.route.params.subscribe(params => {
 
      //this.id = +params['id']; // (+) 
      //get getRutas  
      /* */
      //console.log(params.appointmentId);
      if(params.appointmentId === '5f049b9948ab2c55c1db33fa') {
        this.meet = true;
       
        this.getSessionCall2('5f049b9948ab2c55c1db33fa');
  
        
         
          console.log(this.meet); 
        }else {
          this.meet = false;
        }
     
    }); 
    this.initCall();

  }
  
 


  initCall(){
    console.log(this.meet)
    if (this.meet){
      //this.getSessionCall2('5f049b9948ab2c55c1db33fa');
    } else {
      this.sub = this.route.params.subscribe(params => {
        //this.id = +params['id']; // (+) 
        //get getRutas  
        console.log(params);
          console.log(params.appointmentId);
          this.getSessionCall(params.appointmentId);
          
  
      }); 
    }
   
  }
  getAppointments() {
    this.appointmentsService.getAppointments().subscribe(
      data => {
        //this.consultas = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
  getAppointments2(id) {
    this.appointmentsService.getAppointments2(id).subscribe(
      data => {
        //this.consultas = data;
        console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }
  




  getSessionCall(appointmentId) {
    let apiKey: any;
    let token:any;
    let sessionId:any;
    this.appointmentsService.getAppointmentsSession(appointmentId).subscribe(
      data =>{
        console.log(data.room);
        console.log(data.room.token); 
        this.opentokService.initSession(data.room.token, data.room.sessionId).then((session: OT.Session) => {
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

   getSessionCall2(appointmentId) {
    let apiKey: any;
    let token:any;
    let sessionId:any;
    this.appointmentsService.getAppointments2(appointmentId).subscribe(
      data =>{
        console.log(data.room); 
        this.opentokService.initSession(data.room.token, data.room.sessionId).then((session: OT.Session) => {
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
    this.router.navigate(['/app-paciente/mis-consultas']);
  }


}

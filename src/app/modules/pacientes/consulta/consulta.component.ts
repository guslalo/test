import { Component, OnInit, Input, ChangeDetectorRef  } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
//

session: OT.Session;
streams: Array<OT.Stream> = [];
changeDetectorRef: ChangeDetectorRef;

  
//
@Input() public width: number = 1400;
  /** Defines the max height of the webcam area in px */
  @Input() public height: number = 720;
  public apiKey = "46621542";
  public sessionId = "2_MX40NjYyMTU0Mn5-MTU5MzgwODE0NDcwMX5mQXBjTUpBNWlpQXhld1BGKytoNGhZSG9-fg";
  public token = "T1==cGFydG5lcl9pZD00NjYyMTU0MiZzaWc9NmY2OTkyNThmZjgzMDIwNjFkMmQxZWJmNDA1ODA0ZWQ1YjE4NDZhMzpzZXNzaW9uX2lkPTJfTVg0ME5qWXlNVFUwTW41LU1UVTVNemd3T0RFME5EY3dNWDVtUVhCalRVcEJOV2xwUVhobGQxQkdLeXRvTkdoWlNHOS1mZyZjcmVhdGVfdGltZT0xNTkzODA4MTU4Jm5vbmNlPTAuMzcxMjQ0MTI2MDczMTk3NTcmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NjQwMDE1OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
  
  constructor( private ref: ChangeDetectorRef, private opentokService: OpentokService) { 
    this.changeDetectorRef = ref;
  }

  ngOnInit(): void {
    this.opentokService.initSession().then((session: OT.Session) => {
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
   // this.initializeSession();
  }

  // replace these values with those generated in your TokBox Account




}

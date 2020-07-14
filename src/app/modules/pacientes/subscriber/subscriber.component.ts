import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';
declare var $: any;

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})

export class SubscriberComponent implements AfterViewInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;

  constructor() { }

  ngAfterViewInit() {
 
    const subscriber = this.session.subscribe(
      this.stream, this.subscriberDiv.nativeElement, 
      { width: 300,
      height: 200, showControls:false }
      ,(a)=> (err) => {
      if (err) {
        alert(err.message);
      }
    });
    $('#subscriber:first-child > div:first-child').css( 'width', '100%' );
    $('#subscriber:first-child > div:first-child').css( 'height', 'calc(100vh - 100px)' );  
    //subscriber.subscribeToVideo(false);
    //mySubscriber.setStyle({nameDisplayMode: "off"});
   
  }

  



}

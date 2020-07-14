import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})

export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() toggleVideo: any;

  publisher: OT.Publisher;
  publishing: Boolean;

  video = false
  audio = true;

  constructor(private opentokService: OpentokService, private router: Router,
    private location: Location) {
    this.publishing = false;
  }

  lanzar(){
    if(this.video = !this.video) {
      this.publisher.publishVideo(true)
    }else {
      this.publisher.publishVideo(false)
    }
  }

  
  lanzarAudio(){
    if(this.audio = !this.audio) {
      this.publisher.publishAudio(true)
    }else {
      this.publisher.publishAudio(false)
    }
  }
  desconectar() {
    this.publisher.destroy();
    window.close();
    // this.location.back();
    //this.router.navigate(['app-paciente']);
  }
 
  ngAfterViewInit() {


 
    var publisherOptions = {
      insertMode: 'append',
      width: 400,
      height: 300,
      showControls: true
    };
    //var publisher = OT.initPublisher('publisherContainerElementId', publisherOptions);
    //.publish(publisher); //publisherOptions
    const OT = this.opentokService.getOT();
      this.publisher = OT.initPublisher(this.publisherDiv.nativeElement,  {
        insertMode: 'append',
        width: 300,
        height: 200,
        showControls: false,
        publishAudio:true,
        publishVideo:false
    });
    


    /*, width:'100%', height:'90vh' */
    
    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
        
      }
      this.session.on('sessionConnected', () => this.publish());
    }
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

}

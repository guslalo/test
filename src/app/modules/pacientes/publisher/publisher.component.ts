import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../../../services/opentok.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const publish = () => {};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
})
export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;

  @Input() toggleVideo: any;


  publishing: Boolean;

  video = false;
  audio = true;

  constructor(private opentokService: OpentokService, private router: Router, private location: Location) {
    this.publishing = false;
  }

  lanzar() {
    if ((this.video = !this.video)) {
      // this.publisher.publishVideo(true);
    } else {
      // this.publisher.publishVideo(false);
    }
  }

  lanzarAudio() {
    if ((this.audio = !this.audio)) {

    } else {

    }
  }
  desconectar() {

    window.close();
    // this.location.back();
    // this.router.navigate(['app-paciente']);
  }

  ngAfterViewInit() {
    const publisherOptions = {
      insertMode: 'append',
      width: 400,
      height: 300,
      showControls: true,
    };
    // var publisher = OT.initPublisher('publisherContainerElementId', publisherOptions);
    // .publish(publisher); //publisherOptions



    /*, width:'100%', height:'90vh' */


  }

}

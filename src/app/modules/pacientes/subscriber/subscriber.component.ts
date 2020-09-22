import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent implements AfterViewInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;

  constructor() {}

  ngAfterViewInit() {}
}

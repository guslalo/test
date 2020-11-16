import { Component } from '@angular/core';
import { MessagingService } from './services/messaging.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from './../environments/environment';

import { NgxPermissionsService } from 'ngx-permissions';
import { PoliciesService } from './services/policies.service';

import { IdleEventsService } from './services/idle-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  message: string;
  title = 'itmstl';

  constructor(titleService: Title, router: Router, private permissionsService: NgxPermissionsService, private _policyService: PoliciesService, private idleEvents: IdleEventsService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        const title = environment.title
        //console.log('title', title);
        titleService.setTitle(title);
      }
    });

    idleEvents.inVideoCall$.subscribe(_state => console.log('ESTADO APP', _state))
  }
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  ngOnInit() {

    this._policyService.setPoliciesToUser()

    /*const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage*/
  }
}

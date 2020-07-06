
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../../config';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;

  constructor() {
  
   }
 
  getOT() {
    return OT;
  }

  initSession(token, sessionId) {
    if (config.API_KEY) {
      this.session = this.getOT().initSession(config.API_KEY, sessionId);
      this.token = token;
      return Promise.resolve(this.session);
    } else {
      return fetch(config.SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((json) => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}

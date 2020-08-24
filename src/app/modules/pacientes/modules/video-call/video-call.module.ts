import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoCallRoutingModule } from './video-call-routing.module';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    VideoCallRoutingModule
  ]
})
export class VideoCallModule { }

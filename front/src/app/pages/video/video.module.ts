import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    TranslateModule
  ]
})
export class VideoModule { }

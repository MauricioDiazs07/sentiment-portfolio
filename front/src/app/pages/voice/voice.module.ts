import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceRoutingModule } from './voice-routing.module';
import { VoiceComponent } from './voice.component';


@NgModule({
  declarations: [
    VoiceComponent
  ],
  imports: [
    CommonModule,
    VoiceRoutingModule
  ]
})
export class VoiceModule { }

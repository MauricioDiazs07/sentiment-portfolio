import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceRoutingModule } from './voice-routing.module';
import { VoiceComponent } from './voice.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    VoiceComponent
  ],
  imports: [
    CommonModule,
    VoiceRoutingModule,
    MaterialModule
  ]
})
export class VoiceModule { }

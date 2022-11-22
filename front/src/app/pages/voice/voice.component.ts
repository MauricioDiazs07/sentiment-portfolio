import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent implements OnInit {

  constructor(
    public voiceRecService: VoiceRecognitionService
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
  }

}

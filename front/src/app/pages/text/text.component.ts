import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  constructor(
    public voiceRecService: VoiceRecognitionService
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
  }

}

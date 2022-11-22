import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(
    public voiceRecService: VoiceRecognitionService
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
  }

}

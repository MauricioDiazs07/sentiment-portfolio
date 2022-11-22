import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(
    public voiceRecService: VoiceRecognitionService,
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { getUtterances } from '@app/const/utterance';
import { SpeechSynthesisService } from '@app/shared/services/speech-synthesis.service';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(
    public voiceRecService: VoiceRecognitionService,
    private speechSynthesisService: SpeechSynthesisService,
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
    const lang = this.speechSynthesisService.lang;
    const utterance = getUtterances(lang);

    this.speechSynthesisService.speak(utterance.image);
  }

}

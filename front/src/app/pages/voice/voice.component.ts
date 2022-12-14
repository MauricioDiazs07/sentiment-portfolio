import { Component, OnInit } from '@angular/core';
import { getUtterances } from '@app/const/utterance';
import { SpeechSynthesisService } from '@app/shared/services/speech-synthesis.service';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent implements OnInit {

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

    this.speechSynthesisService.speak(utterance.voice);
  }

}

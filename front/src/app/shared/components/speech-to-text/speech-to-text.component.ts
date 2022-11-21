import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../../services/voice-recognition.service'

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css'],
  providers: [VoiceRecognitionService]
})
export class SpeechToTextComponent implements OnInit {


  constructor(
    public voiceRecService : VoiceRecognitionService
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
   }

  ngOnInit(): void {
  }

  startService(){
    // this.voiceRecService.start();
    this.voiceRecService.startListening();
  }

  stopService(){
    this.voiceRecService.stop();
  }

}
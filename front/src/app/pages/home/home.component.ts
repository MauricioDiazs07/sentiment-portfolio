import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public voiceRecService: VoiceRecognitionService,
  ) { 
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
  }

}

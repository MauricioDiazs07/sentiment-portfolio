import { Component, OnInit } from '@angular/core';
import { SentimentAnalysisService } from '@app/shared/services/sentiment-analysis.service';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  isStarted: boolean = false;
  isFunction: boolean = true;
  isTextAnalyzed: boolean = true;
  lastAnalyzedText: string = '';
  currentText: string = '';

  constructor(
    public voiceRecService: VoiceRecognitionService,
    private sentimentService: SentimentAnalysisService,
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
  }

  sendTextData(text: string) {
    if (this.voiceRecService.isTextAnalyzed){
      console.log("text function");

      this.voiceRecService.getTextAnalysis(text);
    }
  }

}

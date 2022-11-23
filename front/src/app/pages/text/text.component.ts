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
  isPos: boolean = false;
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
    this.sentimentService.getTextAnalysis(
      text
    ).subscribe(res => {
      console.log("Texto:", text);
      this.voiceRecService.reset();
      this.isStarted = true;
      this.isPos = res.isPos;
      this.lastAnalyzedText = res.text;
      this.voiceRecService.setAnalyzedText = false;
    }
    );
  }

}

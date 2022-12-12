import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  error: boolean = false;
  submittedForm: boolean = false;
  lastAnalyzedText: string = '';
  currentText: string = '';
  sentimentForm!: FormGroup;
  emptyText: any;

  constructor(
    public voiceRecService: VoiceRecognitionService,
    private fb: FormBuilder,
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
    this.sentimentForm = this.fb.group({
      text: ["", [Validators.required]]
    })
  }

  sendTextData(text: string):void {
    const emptyText = text.replace(" ", ""). length === 0;
    
    if (this.voiceRecService.isTextAnalyzed && !emptyText) {

      this.voiceRecService.getTextAnalysis(text);
    }
  }

  setAnalyzedText():void {
    this.voiceRecService.reset();
    this.error = this.sentimentForm.get('text')?.hasError('required')!;
    this.submittedForm = true;

    if (!this.error) {
      this.voiceRecService.isTextAnalyzed = true;
      this.voiceRecService.isLoading = true;
    }
  }

}

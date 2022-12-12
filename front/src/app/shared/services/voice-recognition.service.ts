import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getInstructions } from '@app/const/instructions';
import { getLanguage } from '@app/const/languages';
import { TranslateService } from '@ngx-translate/core';
import { normalizeDiacritics } from 'normalize-text'
import { delay, filter } from 'rxjs';
import { SentimentAnalysisService } from './sentiment-analysis.service';

declare var  webkitSpeechRecognition: any;

// supported languages
// supported browsers
// https://codeburst.io/creating-a-speech-recognition-app-in-angular-8d1fd8d977ca

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService implements OnInit {
  // general properties
  recognition = new webkitSpeechRecognition();
  hasInit: boolean = false;
  isStopSpeechRecording: boolean = false;
  _isMariaListening: boolean = false;
  isHome: boolean = false;
  isLoading: boolean = false;
  currentRoute: string = '';
  tempWords: string = '';
  instructions: any;

  // voice properties
  analysisText: string = '';
  lastAnalyzedText: string = '';
  emptyText: boolean = false;
  isStarted: boolean = false;
  isPos: boolean = false;

  // text properties
  isTextAnalyzed: boolean = false;

  // browser settings
  isEdge: boolean = false;

  constructor(
    private router: Router,
    private sentimentService: SentimentAnalysisService,
    public translate: TranslateService,
  ) {
    this.isEdge = this.getBrowser();

    this.router.events.pipe(
      delay(10),
      filter((e) => e instanceof NavigationEnd)
    )
    .subscribe((event: any) => {
      this.currentRoute = event.url;
      console.log(this.currentRoute);
      this.isHome = event.url === '/';
    })
    
    const lang = localStorage.getItem('lang');
    this.instructions = getInstructions(lang!);
  }

  ngOnInit(): void {
  }

  init() {
    let lang = localStorage.getItem('lang');

    if (!lang) {
      lang = window.navigator.language.substring(0, 2);
    }

    this.recognition.interimResults = true;
    this.recognition.lang = getLanguage(lang);

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      this.tempWords = transcript;
      console.log("Transcript:", transcript);
  })
  }

  start() {
    this.isStarted = false;

    if (this.hasInit) return;

    this.hasInit = true;
    this.isStopSpeechRecording = false;
    this.startRecognition();
    console.log("Speech Recognition Started");
    this.recognition.addEventListener('end', () => {
      if (this.isStopSpeechRecording) {
        this.stopRecognition();
      } else {
        this.listen();
        this.startRecognition();
      }
    });
  }

  stop() {
    this.isStopSpeechRecording = true;
    this.stopRecognition();
    console.log("End speech recognition");
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
  }

  startListening() {
    console.log("estoy escuchando");
    this.tempWords = '';
    this._isMariaListening = true;
    console.log(this._isMariaListening);
  }

  reset(isInstruction: boolean = true): void {
    this.stopRecognition();
    this._isMariaListening = false;
    this.isStarted = false;
    this.isLoading = false;
    this.emptyText = false;
    this.lastAnalyzedText = '';
    this.tempWords = '';
    if (!isInstruction) return;
    this.analysisText = '';
  }

  listen(): void {
    let text = this.normalize(this.tempWords);

    if (this.isCalling(text)) {
        this.startListening();
    }
    
    if (!this._isMariaListening) {
      this.saveAnalysisText();
      return;
    }

    let isNavigation = this.isNavigation(text);

    if (isNavigation) return;
    
    this.isInstruction(text);

  }

  isNavigation(text: string):boolean {

    if (text.match(this.instructions.pages.main)) {
      this.reset();
      this.router.navigate(['/']);
    }
    else if (text.match(this.instructions.pages.video)) {
      this.reset();
      this.router.navigate(['/video-recognition']);
    }
    else if (text.match(this.instructions.pages.image)) {
      this.reset();
      this.router.navigate(['/image-recognition']);
    }
    else if (text.match(this.instructions.pages.text)) {
      this.reset();
      this.router.navigate(['/text-recognition']);
    }
    else if (text.match(this.instructions.pages.voice)) {
      this.reset();
      this.router.navigate(['/voice-recognition']);
    }
    else {
      return false;
    }

    return true;
  }

  isInstruction(text: string): void {
    if (text.match(this.instructions.stopListening)) {
      this.reset(false);
    }

    if (this.currentRoute === '/voice-recognition') {
      this.listenVoiceInstructions(text);
    }
    else if (this.currentRoute === '/text-recognition' ) {
      this.listenTextInstructions(text);
    }
    else {
      this.listenGeneralInstructions(text);
    }
  }

  listenVoiceInstructions(text: string): void {
    if (text.match(this.instructions.text.clean)) 
    {
      this.reset();
    }
    else if (text.match(this.instructions.text.analyze)) 
    {
      this.emptyText = this.analysisText.replace(' ', '').length === 0;
      if (this.emptyText) {
        this._isMariaListening = false;
        this.isStarted = false;
        return;
      }
      
      this.getTextAnalysis(this.analysisText);
    }
  }

  listenTextInstructions(text: string): void {
    if (text.match(this.instructions.text.clean)) 
    {
      this.reset();
    }
    else if (text.match(this.instructions.text.analyze))
    {
      this.isTextAnalyzed = true;
    }
  }

  listenGeneralInstructions(text: string): void {
    console.log("HOLA GENERAL");
  }

  getTextAnalysis(text: string): void {
    
    this.isLoading = true;
    this.sentimentService.getTextAnalysis(
      text
      ).subscribe(res => {
        this.isTextAnalyzed = false;
        this.reset();
        this.isPos = res.isPos;
        this.lastAnalyzedText = res.text;
        this.isStarted = true;
        this.isLoading = false;
      }
    );
  }

  saveAnalysisText(): void {
    let dot = this.tempWords.length != 0 && !this.isEdge 
                ? '.' : '';
    let firstLetter = this.tempWords.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    
    let tempWords = firstLetter + this.tempWords.slice(1);

    this.analysisText = this.analysisText + ' ' + tempWords + dot;
    this.tempWords = '';
  }

  isCalling(text: string): boolean {
    return text.match(this.instructions.calling) ? true : false;
  }

  private normalize(str: string): string {
    return normalizeDiacritics(str.toLowerCase()).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  }

  private getBrowser() {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('edg') > -1;
  }
}

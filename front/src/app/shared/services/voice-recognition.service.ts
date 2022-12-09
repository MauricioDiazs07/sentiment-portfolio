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

  // voice properties
  analysisText: string = '';
  lastAnalyzedText: string = '';
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
  }

  ngOnInit(): void {
  }

  init() {
    const browserLanguage = window.navigator.language.substring(0, 2);

    this.recognition.interimResults = true;
    this.recognition.lang = getLanguage(browserLanguage);

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
    this.lastAnalyzedText = '';
    this.tempWords = '';
    if (!isInstruction) return;
    this.analysisText = '';
  }

  listen(): void {
    let text = this.normalize(this.tempWords);
    const lang = localStorage.getItem('lang');
    const instructions = getInstructions(lang!);

    if (this.isCalling(text, instructions.calling)) {
        this.startListening();
    }
    
    if (!this._isMariaListening) {
      if(this.currentRoute == '/voice-recognition'){
        this.saveAnalysisText();
      }
      return;
    }

    let isNavigation = this.isNavigation(text, instructions);

    if (isNavigation) return;

    this.isInstruction(text, instructions);

  }

  isNavigation(text: string, instructions: any):boolean {
    let instruction = instructions.instruction
                            .some((v: string) => text.includes(v));

    if (!instruction){
      return false;
    }

    let route = '';

    if (text.includes('principal') ||
        text.includes('regresar') ||
        text.includes('menu')) {
      route = '/';
    }
    else if (text.includes('video')) {
      route = '/video-recognition';
    }
    else if (text.includes('imagen')) {
      route = '/image-recognition';
    }
    else if (text.includes('texto')) {
      route = '/text-recognition';
    }
    else if (text.includes('voz') ||
             text.includes('vos')) {
      route = '/voice-recognition';
    }

    this.reset();
    this.router.navigate([route]);

    return true;
  }

  isInstruction(text: string, instructions: any): void {
    if (text.includes('nada')) {
      this.reset(false);
    }

    if (this.currentRoute === '/voice-recognition') {
      this.listenVoiceInstructions(text);
    }
    else if (this.currentRoute === '/text-recognition' ) {
      this.listenTextInstructions(text);
    }
    else if (this.currentRoute === '/image-recognition') {
      this.listenImageInstructions(text);
    }
    else if (this.currentRoute === '/video-recognition') {
      this.listenVideoInstructions(text);
    }
  }

  listenVoiceInstructions(text: string): void {
    if (text.includes('borra') &&
        text.includes('todo')) 
    {
      this.reset();
    }
    else if (text.includes('analiza') &&
             text.includes('texto')) 
    {
      this.getTextAnalysis(this.analysisText);
      this.isLoading = true;
    }
  }

  listenTextInstructions(text: string): void {
    if (text.includes('borra') &&
        text.includes('todo')) 
    {
      this.reset();
    }
    else if (text.includes('analiza') &&
             text.includes('texto'))
    {
      this.isTextAnalyzed = true;
      this.isLoading = true;
    }
  }

  listenImageInstructions(text: string): void {
    console.log("HOLA IMAGEN")

  }

  listenVideoInstructions(text: string): void {
    console.log("HOLA VIDEO")
  }

  getTextAnalysis(text: string): void {
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

  isCalling(text: string, re: string): boolean {
    return text.match(re) ? true : false;
  }

  private normalize(str: string): string {
    return normalizeDiacritics(str.toLowerCase()).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  }

  private getBrowser() {
    return window.navigator.userAgent.toLocaleLowerCase().indexOf('edg') > -1;
  }
}

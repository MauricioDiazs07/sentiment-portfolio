import { Injectable, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { delay, filter } from 'rxjs';

declare var  webkitSpeechRecognition: any;

// supported languages
// supported browsers
// https://codeburst.io/creating-a-speech-recognition-app-in-angular-8d1fd8d977ca

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService implements OnInit {
  recognition = new webkitSpeechRecognition();
  isStopSpeechRecording: boolean = false;
  _isMarkListening: boolean = false;
  isHome: boolean = false;
  public text: string = '';
  tempWords: string = '';

  constructor(
    private router: Router,
  ) {
    this.router.events.pipe(
      delay(10),
      filter((e) => e instanceof NavigationEnd)
    )
    .subscribe((event: any) => {
      this.isHome = event.url === '/';
    })
  }

  ngOnInit(): void {
  }
  
  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-MX';
    // this.recognition.lang = 'en-US';
    // this.recognition.lang = 'de-DE';
    // this.recognition.lang = 'fr-FR';

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
    this.isStopSpeechRecording = false;
    this.startRecognition();
    console.log("Speech Recognition Started");
    this.recognition.addEventListener('end', () => {
      if (this.isStopSpeechRecording) {
        this.stopRecognition();
      } else {
        this.wordConcat();
        this.startRecognition();
      }
    });
  }

  stop() {
    this.isStopSpeechRecording = true;
    console.log("End speech recognition");
    this.wordConcat();
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
    if (this.text.toLowerCase().includes('video') &&
      this._isMarkListening  
    ) {
      this.reset();
      this.router.navigate(['/video-recognition']);
    }
    else if (this.text.toLowerCase().includes('principal') &&
      this._isMarkListening  
    ) {
      this.reset();
      this.router.navigate(['/']);
    }
    else if (this.text.toLowerCase().includes('imagen') &&
      this._isMarkListening  
    ) {
      this.reset();
      this.router.navigate(['/image-recognition']);
    }
    else if (this.text.toLocaleLowerCase().includes('text') &&
      this._isMarkListening  
    ) {
      this.reset();
      this.router.navigate(['/text-recognition']);
    }
    else if (this.text.toLocaleLowerCase().includes('voz') ||
    this.text.toLocaleLowerCase().includes('vos') &&
      this._isMarkListening  
    ) {
      this.reset();
      this.router.navigate(['/voice-recognition']);
    }

    else if (
      this.text.toLowerCase().includes('mark') || 
      this.text.toLowerCase().includes('market') ||
      this.text.toLocaleLowerCase().includes('mar') ||
      this.text.toLocaleLowerCase().includes('mac')
      ) {
        this.reset();
        this.startListening();
    }

  }

  startListening() {
    console.log("estoy escuchando");
    this.text = '';
    this._isMarkListening = !this._isMarkListening;
    console.log(this._isMarkListening);
  }

  reset() {
    this.stopRecognition();
    this._isMarkListening = false;
    this.text = '';
    
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {
	public selectedRate: number;
	public selectedVoice: SpeechSynthesisVoice | null;
	public voices: SpeechSynthesisVoice[];
  public lang: string;

	// I initialize the app component.
	constructor() {
		this.voices = [];
		this.selectedVoice = null;
		this.selectedRate = 1;

    this.lang = localStorage.getItem('lang')!;

    if (!this.lang) {
      this.lang = window.navigator.language.substring(0, 2);
    }
    
    speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        this.voices = speechSynthesis.getVoices();
        this.selectedVoice = (this.voices[1] || null);
      }
    );
	}
  
	public ngOnInit() : void { }
  
	public speak(text: string) : void {
		if (!this.selectedVoice) {
			return;
		}

		this.stop();
		this.synthesizeSpeechFromText(this.selectedRate, text);
	}
  
	public stop() : void {
		if (speechSynthesis.speaking) {
			speechSynthesis.cancel();
		}
	}
  
	private synthesizeSpeechFromText(
		rate: number,
		text: string
	): void {
		var utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = this.selectedVoice;
		utterance.rate = rate;
    utterance.pitch = 0;

    utterance.onerror = function() {
      console.error("Error");
    }

		speechSynthesis.speak(utterance);
	}
}
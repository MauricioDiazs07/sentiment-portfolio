import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getAllLanguages } from './const/languages';
import { VoiceRecognitionService } from './shared/services/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sentiment-portfolio';

  constructor(
    public translate: TranslateService,
    public voiceRecService: VoiceRecognitionService
  ) {
    const languages = getAllLanguages();
    let lang = localStorage.getItem('lang');
    if (!lang) {
      lang = window.navigator.language.substring(0, 2);
    }
    localStorage.setItem('lang', lang);

    translate.addLangs(languages);
    translate.setDefaultLang(lang);
  }
}

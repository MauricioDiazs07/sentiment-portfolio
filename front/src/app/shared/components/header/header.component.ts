import { Component, OnInit } from '@angular/core';
import { getLanguage } from '@app/const/languages';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private voiceRecService: VoiceRecognitionService,
  ) { }

  ngOnInit(): void {
  }

  switchLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    const language = getLanguage(lang);
    this.voiceRecService.recognition.lang = language;
    this.translate.use(lang);
    this.voiceRecService.reset();
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
// import { MaterialModule } from '@app/material.module';
import { SpeechToTextComponent } from '@app/shared/components/speech-to-text/speech-to-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpeechToTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

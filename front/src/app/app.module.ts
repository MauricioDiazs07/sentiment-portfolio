import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    // MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

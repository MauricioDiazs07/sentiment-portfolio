import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextRoutingModule } from './text-routing.module';
import { TextComponent } from './text.component';


@NgModule({
  declarations: [
    TextComponent
  ],
  imports: [
    CommonModule,
    TextRoutingModule
  ]
})
export class TextModule { }

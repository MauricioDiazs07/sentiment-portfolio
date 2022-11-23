import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextRoutingModule } from './text-routing.module';
import { TextComponent } from './text.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TextComponent
  ],
  imports: [
    CommonModule,
    TextRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TextModule { }

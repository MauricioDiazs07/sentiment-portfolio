import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from './image.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ImageComponent,
    UploadImgComponent
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class ImageModule { }

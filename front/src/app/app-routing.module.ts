import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'image-recognition', loadChildren: () => import('./pages/image/image.module').then(m => m.ImageModule) },
  { path: 'voice-recognition', loadChildren: () => import('./pages/voice/voice.module').then(m => m.VoiceModule) },
  { path: 'text-recognition', loadChildren: () => import('./pages/text/text.module').then(m => m.TextModule) },
  { path: 'video-recognition', loadChildren: () => import('./pages/video/video.module').then(m => m.VideoModule) }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SentimentAnalysisService } from '@app/shared/services/sentiment-analysis.service';
import { VoiceRecognitionService } from '@app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videoRef: any;
  width = 0;
  height = 0;

  shortLink: any = '';
  takePicture: boolean = true;

  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  constructor(
    public voiceRecService: VoiceRecognitionService,
    private sentimentService: SentimentAnalysisService,
  ) {
    this.voiceRecService.init();
    this.voiceRecService.start();
  }

  ngOnInit(): void {
    this.setupCamera();
    this.adjustCanvas();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustCanvas();
  }

  adjustCanvas() {
    if (window.innerWidth > 600) {
      this.width = window.innerWidth * 0.4;
      this.height = this.width * 0.75;
    }
    else {
      this.width = window.innerWidth * 0.8;
      this.height = this.width * 0.8;
    }
  }

  async setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:false
    });

    if (stream) {
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.play();
    }
  }

  async capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    let img_url = this.canvas.nativeElement.toDataURL("image/png");
    // console.log(img_url);

    let img = await fetch(img_url).then(r => r.blob());

    this.sentimentService.getImgAnalysis(
      img
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          var reader = new FileReader();

          // original img
          reader.readAsDataURL(event);

          reader.onload = (_event) => {
            this.shortLink = reader.result;
          }
        }
      }
    )
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.width, this.height);
  }

  async analyzePicture() {
    if (this.takePicture) {
      this.takePicture = false;
      this.capture();
      await this.delay(2000);
      this.takePicture = true;
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

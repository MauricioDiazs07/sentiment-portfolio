import { Component, OnInit } from '@angular/core';
import { SentimentAnalysisService } from '@app/shared/services/sentiment-analysis.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  
  shortLink: any = "";
  originalLink: any = "";
  loading: boolean = false;
  file!: File;

  constructor(
    private sentimentService: SentimentAnalysisService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any): void {
      this.file = event.target.files[0];
  }

  onUpload() {
      this.loading = !this.loading;
      // console.log(this.file);

      this.sentimentService.getImgAnalysis(
        this.file
      ).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
              // console.log(event);

              var mimeType = this.file.type;
              // console.log(mimeType);
            
              var originalReader = new FileReader();
              var processedReader = new FileReader();

              // original img
              originalReader.readAsDataURL(this.file);

              originalReader.onload = (_event) => {
                this.originalLink = originalReader.result;
              }

              // processed img
              processedReader.readAsDataURL(event)
              processedReader.onload = (_event) => {
                this.shortLink = processedReader.result
              }

              this.loading = false;
            }
        }
      );
  }
}
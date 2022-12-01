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
  notFile: boolean = false;
  imgFile: boolean = true;
  file!: File;

  constructor(
    private sentimentService: SentimentAnalysisService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any): void {
      this.file = event.target.files[0];
  }

  onUpload(): void {
    this.notFile = this.file ? false : true;

    if (this.notFile) return;

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const filePath = this.file.name;
    this.imgFile = allowedExtensions.exec(filePath)
                    ? true : false;

    if (!this.imgFile) return;

    this.loading = !this.loading;

    
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
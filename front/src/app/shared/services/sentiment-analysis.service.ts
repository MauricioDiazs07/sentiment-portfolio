import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { TextResponse } from '../models/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {
  api_url: string = environment.API_URL

  constructor(
    private http: HttpClient,
  ) { }

  getTextAnalysis(
    text: string
  ): Observable<TextResponse> {
    const body = {
      'text': text,
      'lang': 'es'
    }
    const url = `${this.api_url}/get-text-sentiment`;

    return this.http.post<TextResponse>(url, body)
      .pipe(
        map(res => res)
      );
  }

  getImgAnalysis(
    img: any
  ): Observable<any> {
    const url = `${this.api_url}/get-img-sentiment`;
    const formData = new FormData();

    formData.append("img", img, img.name);

    return this.http.post(url, formData, {responseType: 'blob'});
  }
}

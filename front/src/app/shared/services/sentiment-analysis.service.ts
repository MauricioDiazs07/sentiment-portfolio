import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { TextResponse } from '../models/responses.interface';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {
  api_url: string = `${environment.API_URL}/api/sentiment`

  constructor(
    private http: HttpClient,
  ) { }

  getTextAnalysis(
    text: string
  ){
    const body = {
      'text': text,
      'lang': 'es'
    }
    const url = `${this.api_url}/get-text-sentiment`;
    const headers = this.getHeaders();

    return this.http.post<TextResponse>(url, body, headers);
  }

  getImgAnalysis(
    img: any
  ): Observable<any> {
    const url = `${this.api_url}/get-img-sentiment`;
    const formData = new FormData();

    formData.append("img", img, img.name);

    return this.http.post(url, formData, {responseType: 'blob'});
  }

  private getHeaders(): Object {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')

    return {'headers': headers};
  }
}
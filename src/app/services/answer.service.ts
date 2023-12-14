import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http:HttpClient) { }
  submitAnswer(answerDTO: any) {
    return this.http.post(`${environment.baseurl}/answers/submitAnswer`, answerDTO);
  }
}

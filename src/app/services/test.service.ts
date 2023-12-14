import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
const API_URL = 'http://localhost:5555/gateway/purchase';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }
  getallTestsByCourseId(courseId:any){
    return this.http.get(`${environment.baseurl}/tests/byCourse/${courseId}`)
  }
  submitAnswer(answerDTO: any) {
    return this.http.post(`${environment.baseurl}/submitAnswer`, answerDTO);
  }
  UserScore(userId:any,testId:any){
    return this.http.get(`${environment.baseurl}/tests/user-score/${userId}/${testId}`)
  }
}

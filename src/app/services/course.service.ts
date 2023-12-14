import { Injectable } from '@angular/core';

import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment.development';
import { Status } from '../models/status.enum';

const API_URL = '/api/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveCourse(course: Course): Observable<any> {
    return this.http.post(API_URL, course, {headers: this.getHeaders});
  }

  deleteCourse(course: Course): Observable<any> {
    return this.http.delete(API_URL + '/' + course.id, {headers: this.getHeaders});
  }
  getoneCourse(id : any){
    return this.http.get(`${environment.baseurl}/api/course/getCourse/${id}`)
  }

  getAllCourses(): Observable<any> {
    return this.http.get(`${environment.baseurl}/api/course/getAll`)
  }

  updateCourseStatus(courseId: number, status: Status): Observable<any> {
    const statusUpdateDto = { status }; // Create a StatusUpdateDto object
    return this.http.put(`${environment.baseurl}/api/course/updateStatus/${courseId}`, statusUpdateDto);
  }
}

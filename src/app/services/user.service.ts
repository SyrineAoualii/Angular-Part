import { Injectable } from '@angular/core';

import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../models/user.models';

const API_URL = 'http://localhost:5555/api/user';


@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService{
  private baseUrl = 'http://localhost:5555/api/user';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }


  getUser(userId: string): Observable<any> {
    const url = `http://localhost:5555/api/user/${userId}`;
    return this.http.get(url);
  }


  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/byRole/${role}`);
  }

  changeRole(newRole: string): Observable<any> {
    return this.http.put(API_URL + '/change/' + newRole, {}, {headers: this.getHeaders});
  }
}

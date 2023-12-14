import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.models";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currenUserSubject: BehaviorSubject<User>;
   API_URL = 'http://localhost:5555/api/v1/auth';

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currenUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currenUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currenUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.API_URL + '/authenticate', user).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currenUserSubject.next(response);
        }
        return response;
      })
    );
  }

  Register(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/register', user);
  }

  signup(signuprequest:any){
    return this.http.post(`${environment.secondbaseurl}/api/v1/auth/register`,signuprequest)
  }
  signin(loginrequest:any){
    return this.http.post(`${environment.secondbaseurl}/api/v1/auth/authenticate`,loginrequest)
 }
  logOut() {
    localStorage.removeItem('currentUser');
    this.currenUserSubject.next(new User);
  }

  sendEmail(emailrequest:any){
    return this.http.post(`${environment.secondbaseurl}/api/v1/auth/send-email`,emailrequest)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:5555/api/v1/auth/register';
  private loginUrl = 'http://localhost:5555/api/v1/auth/authenticate';

  constructor(private http: HttpClient) {}

  signup(signuprequest:any){
    return this.http.post(`${environment.secondbaseurl}/api/v1/auth/register`,signuprequest)
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
}
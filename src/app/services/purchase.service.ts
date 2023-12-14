import { Injectable } from '@angular/core';

import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../models/purchase.model";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment.development';

const API_URL = 'http://localhost:5555/gateway/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService {
  private currentCourseId: string | null = null;
    private currentTotal: number | null = null;
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  savePurchase(purchase: Purchase): Observable<any> {
    return this.http.post(API_URL, purchase, {headers: this.getHeaders});
  }

  getAllPurchaseItems(): Observable<any> {
    return this.http.get(API_URL, {headers: this.getHeaders});
  }
  addpurchase(purchase:any){
    return this.http.post(`${environment.thirdbaseurl}/api/purchase`,purchase);
  }
  // In your purchase service



    // existing constructor and methods...

    // Additional methods to set and get course details
    setCourseDetails(courseId: string, total: number) {
        this.currentCourseId = courseId;
        this.currentTotal = total;
    }

    getCourseId() {
        return this.currentCourseId;
    }

    getTotal() {
        return this.currentTotal;
    }
    getAllPurchasesByUserId(id:any){
      return this.http.get(`${environment.thirdbaseurl}/api/purchase/${id}`)
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private itemsInCart: Course[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addToCart(item: Course): void {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public removeFromCart(item: Course): void {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public getItems(): Observable<Course[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public clearCart(): void {
    this.itemsInCartSubject.next([]);
  }
}

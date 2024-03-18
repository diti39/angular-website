import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  selectedProducts: any[] = [];
  private selectedProductsCountSubject: Subject<number> = new Subject<number>();

  constructor() { }

  addProduct(product: any) {
    const index = this.selectedProducts.findIndex(p => p.name === product.name);
    if (index !== -1) {
      // If product already exists in cart, increment its quantity
      this.selectedProducts[index].quantity++;
    } else {
      // If product is not in cart, add it with quantity 1
      product.quantity = 1;
      this.selectedProducts.push(product);
    }

    this.selectedProductsCountSubject.next(this.selectedProducts.length);
  }

  removeProduct(product: any) {
    const index = this.selectedProducts.findIndex(p => p.name === product.name);
    if (index !== -1) {
      // If product exists in cart, decrement its quantity
      if (this.selectedProducts[index].quantity > 1) {
        this.selectedProducts[index].quantity--;
      } else {
        // If product quantity is 1, remove it from the cart
        this.selectedProducts.splice(index, 1);
      }
      this.selectedProductsCountSubject.next(this.selectedProducts.length);
    }
  }

  getSelectedProducts(): Observable<any[]> {
    return new Observable<any[]>(observer => {
      observer.next(this.selectedProducts);
      observer.complete();
    });
  }

  getSelectedProductsCountObservable() {
    return this.selectedProductsCountSubject.asObservable();
  }

  resetSelectedProducts() {
    this.selectedProducts = [];
    this.selectedProductsCountSubject.next(0);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  getCartItems() {
    return this.getCartArray();
  }
  decrease(productId: number) {
    this.decrement(productId);
  }
  increase(productId: number) {
    this.increment(productId);
  }
  cartCount$: any;
  addToCart(product: any) {
    if (product && typeof product === 'object' && product.id != null) {
      this.add(product);
    } else {
      this.add(product);
    }
  }
  private cartSubject = new BehaviorSubject<Record<number, {product: any, quantity: number}>>({});
  readonly cart$ = this.cartSubject.asObservable();
  private itemsSubject = new BehaviorSubject<Record<number, number>>({});
  readonly items$ = this.itemsSubject.asObservable();
  readonly totalCount$ = this.items$.pipe(
    map(items => Object.values(items).reduce((sum, v) => sum + v, 0))
  );
  add(product: any) {
    const id = product.id;
    const cur = { ...this.cartSubject.value };
    const itemsQty = { ...this.itemsSubject.value };
    
    if (cur[id]) {
      cur[id].quantity++;
    } else {
      cur[id] = { product, quantity: 1 };
    }
    itemsQty[id] = cur[id].quantity;
    
    this.cartSubject.next(cur);
    this.itemsSubject.next(itemsQty);
  }

  increment(productId: number) {
    const cur = { ...this.cartSubject.value };
    if (cur[productId]) {
      cur[productId].quantity++;
      this.cartSubject.next(cur);
      const itemsQty = { ...this.itemsSubject.value };
      itemsQty[productId] = cur[productId].quantity;
      this.itemsSubject.next(itemsQty);
    }
  }

  decrement(productId: number) {
    const cur = { ...this.cartSubject.value };
    if (!cur[productId]) return;
    cur[productId].quantity--;
    if (cur[productId].quantity <= 0) {
      delete cur[productId];
    }
    this.cartSubject.next(cur);
    
    const itemsQty = { ...this.itemsSubject.value };
    if (cur[productId]) {
      itemsQty[productId] = cur[productId].quantity;
    } else {
      delete itemsQty[productId];
    }
    this.itemsSubject.next(itemsQty);
  }

  getQuantity(productId: number) {
    return this.items$.pipe(map(items => items[productId] || 0));
  }
  private getCartArray() {
    const cart = this.cartSubject.value;
    return Object.keys(cart).map(k => ({
      id: Number(k),
      ...cart[Number(k)].product,
      quantity: cart[Number(k)].quantity
    }));
  }
  private getItemsArray() {
    const items = this.itemsSubject.value;
    return Object.keys(items).map(k => ({ id: Number(k), quantity: items[Number(k)] }));
  }
  clearCart() {
    this.cartSubject.next({});
    this.itemsSubject.next({});
  }
}

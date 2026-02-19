import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
  private router = inject(Router);

  cart$ = this.cartService.cart$.pipe(
    map(cart => {
      return Object.keys(cart).map(k => ({
        id: Number(k),
        ...cart[Number(k)].product,
        quantity: cart[Number(k)].quantity
      }));
    })
  );

  increment(productId: number) {
    this.cartService.increment(productId);
  }

  decrement(productId: number) {
    this.cartService.decrement(productId);
  }

  getTotal(cartItems: any[]) {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  }

  completeOrder() {
    const cartData = this.cartService.getCartItems();
    if (cartData.length === 0) {
      alert('The basket is empty!');
      return;
    }
    console.log('Order Details:', cartData);
    alert('Your order has been received successfully! Thank you for shopping with us.');
    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }
}

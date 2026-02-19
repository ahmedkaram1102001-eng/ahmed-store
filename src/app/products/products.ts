import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/users';
import { combineLatest, map } from 'rxjs';
import { SearchService } from '../shared/search.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
})
export class Products implements OnInit {
increase(arg0: any) {
throw new Error('Method not implemented.');
}
decrease(arg0: any) {
throw new Error('Method not implemented.');
} 
  private productService = inject(ProductService);
  private searchService = inject(SearchService);
  private cartService = inject(CartService);
  private router = inject(Router);
  quantities: Record<number, number> = {};
  selectedProduct: any = null;
  localQuantity = 1;
  modalInstance: any = null;

  products$ = combineLatest([
    this.productService.getAllProducts(),
    this.searchService.term$
  ]).pipe(
    map(([products, term]) => {
      if (!term || term.trim() === '') {
        return products;
      }
      return products.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    })
  );

  ngOnInit(): void {
  }
  increment(productId: number) {
    this.cartService.increment(productId);
    this.quantities[productId] = (this.quantities[productId] || 0) + 1;
  }
  decrement(productId: number) {
    this.cartService.decrement(productId);
    if (this.quantities[productId] > 1) {
      this.quantities[productId]--;
    } else {
      delete this.quantities[productId];
    }
  }
  openAddModal(product: any) {
    this.selectedProduct = product;
    this.localQuantity = 1;
    const modalEl = document.getElementById('cartModal');
    if (modalEl && (window as any).bootstrap) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }
  increaseLocal() {
    this.localQuantity++;
  }

  decreaseLocal() {
    if (this.localQuantity > 1) this.localQuantity--;
  }
  confirmAdd() {
    if (!this.selectedProduct) return;
    for (let i = 0; i < this.localQuantity; i++) {
      this.cartService.add(this.selectedProduct);
    }
    const id = this.selectedProduct.id;
    this.quantities[id] = (this.quantities[id] || 0) + this.localQuantity;
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.selectedProduct = null;
    this.localQuantity = 1;
    this.router.navigate(['/Cart']);
  }
}
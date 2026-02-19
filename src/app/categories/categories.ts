import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/users';
import { map } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {

  private productService = inject(ProductService);
  private router = inject(Router);

  categories$ = this.productService.getAllProducts().pipe(
    map(products => {
      const uniqueCategories = new Map();

      products.forEach(product => {
        if (!uniqueCategories.has(product.category.id)) {
          uniqueCategories.set(product.category.id, product.category);
        }
      });

      return Array.from(uniqueCategories.values());
    })
  );

  goToCategory(id: number) {
    this.router.navigate(['/products', id]);
  }

}

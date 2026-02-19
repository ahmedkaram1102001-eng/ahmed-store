import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../shared/search.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private searchService = inject(SearchService);
  private cartService = inject(CartService);
  cartCount$ = this.cartService.totalCount$;

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchService.setTerm(target.value);
  }

}

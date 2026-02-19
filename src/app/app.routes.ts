import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Cart } from './cart/cart';
import { Products } from './products/products';
import { Categories } from './categories/categories';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'Cart', component: Cart },
  { path: 'Products', component: Products },
  { path: 'Categories', component: Categories },
];


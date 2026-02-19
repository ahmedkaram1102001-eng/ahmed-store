import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Login } from "./login/login";
import { Footr } from './footr/footr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Login, Footr],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
showLoginModal() {
throw new Error('Method not implemented.');
}
  protected readonly title = signal('ahmed');
}

import { Component, inject, signal} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Auth } from './features/auth/services/auth';
import { Login } from './features/auth/components/login/login';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Empresa ACME');
  public authService = inject(Auth);
}

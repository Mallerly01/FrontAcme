import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

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
  private router = inject(Router);
  esRutaPublica = signal(false);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const path = this.router.url.split('?')[0];
      const rutasPublicas = ['/login', '/forgot-password', '/reset-password'];
      this.esRutaPublica.set(rutasPublicas.includes(path));
    });
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = environment.apiEndpoint;
  isAutenticated = signal<boolean>(false);
  private router = inject(Router);

  constructor(){
    this.isAutenticated.set(!!localStorage.getItem('token'));
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.isAutenticated.set(false);
    this.router.navigate(['/login']);
  }

  login(email: string, password: string){
    let userLogin = {email: email, password:password}
    return this.http.post(`${this.apiUrl}/login`, userLogin).pipe(
      map((resp: any) => {
        console.log('login successful', resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.isAutenticated.set(true);
        this.router.navigate(['/home']);
      })
    );
  }
}

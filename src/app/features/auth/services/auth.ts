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
        return resp;
      })
    );
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, password });
  }

  public loginGoogle(token: string){
    const header = { 'Content-Type': `application/json` };
    let googleToken = {googletoken: token};
    return this.http.post(`${this.apiUrl}/google-login`, googleToken, {headers: header}).pipe(
      map((resp: any) => {
        console.log('Login with Google successful:', resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.isAutenticated.set(true);
        this.router.navigate(['/home']);
        return resp;
      })
    );

  }

}

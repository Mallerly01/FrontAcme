import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Auth } from '../services/auth';

export const loginGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  let authService = inject(Auth);

  if (!authService.isAutenticated()){
    console.log('No estas autentificado');
    return inject(Router).createUrlTree(['/login']);
  }
  return true;
};

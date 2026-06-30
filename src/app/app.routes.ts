import { Routes } from '@angular/router';
import { Product } from './features/products/components/product/product';
import { Login } from './features/auth/components/login/login';
import { ForgotPassword } from './features/auth/components/forgot-password/forgot-password';
import { ResetPassword } from './features/auth/components/reset-password/reset-password';
import { Welcome } from './features/home/welcome/welcome';
import { Map } from './features/maps/components/map/map'
import { loginGuard } from './features/auth/guards/login-guard'
import { Number } from './features/numbers/components/number/number'
import { User } from './features/users/components/user/user';
import { ProductPagination } from './features/products/components/product-pagination/product-pagination';
import { ProductSales } from './features/dashboards/components/product-sales/product-sales';

export const routes: Routes = [
  { path: 'home', component: Welcome, canActivate: [loginGuard] },
  { path: 'maps', component: Map, canActivate: [loginGuard] },
  { path: 'products', component: Product, canActivate: [loginGuard] },
  { path: 'numbers', component: Number, canActivate: [loginGuard] },
  { path: 'users', component: User, canActivate: [loginGuard] },
  { path: 'products-sales', component: ProductSales, canActivate: [loginGuard] },
  { path: 'products-pagination', component: ProductPagination, canActivate: [loginGuard] },
  { path: 'login', component: Login },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];


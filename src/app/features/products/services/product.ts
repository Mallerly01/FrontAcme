import { Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { Observable, switchMap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Product {
  products = signal<IProduct[]>([]);
  private apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    return { headers: { 'Authorization': `Bearer ${token}` } };
  }

  getProducts(): Observable<IProduct[]> {
    let token = localStorage.getItem('token') || '';
    console.log('Token from localStorage', token);
    return this.http.get<IProduct[]>(
      `${this.apiUrl}/productos`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    ).pipe(
      map((resp: any) => resp.productos)
    );
  }

  generateProductCode(): string {
    const randomNum = Math.floor(Math.random() * (100- 10) + 10);
    return `PROD${randomNum.toString().padStart(3, '0')}`;
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/productos`, product, this.getAuthHeaders());
  }

  saveProductWithImage(formData: FormData): Observable<any> {
    let token = localStorage.getItem('token') || '';
    return this.http.post<any>(`${this.apiUrl}/productos`, formData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  searchProduct(code: string): Observable<any> {
    return timer(1000).pipe(switchMap(() => {
      return this.http.get<any>(`${this.apiUrl}/existeproducto/${code}`, this.getAuthHeaders()).pipe(
        map((resp: any) => resp.data)
      );
    }));
  }

  deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/productos/${id}`, this.getAuthHeaders());
  }

  updateProduct(id:number, product: IProduct): Observable <IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/productos/${id}`, product, this.getAuthHeaders());
  }

  /*getProducts(): IProduct[] {
    return [
      {
        productId: 1,
        productName: 'Zapatilla de Lona',
        productCode: 'TOOL-001',
        releaseDate: '2023-05-15',
        price: 19.99,
        description: 'Zapatilla de lona cómoda y duradera',
        starRating: 4.5,
        imageUrl: 'imagen1.png'
      },
      {
        productId: 2,
        productName: 'Zapatilla Deportiva',
        productCode: 'TOOL-001',
        releaseDate: '2023-05-15',
        price: 19.99,
        description: 'Zapatilla deportiva para correr',
        starRating: 157,
        imageUrl: 'imagen2.png'
      }
    ]
  }*/
}

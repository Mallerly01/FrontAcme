import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductSalesAnalytics {
  private http = inject(HttpClient);
  private apiUrl = environment.apiEndpoint;

  getSales(){
    return [
      {"name": "Moviles", "value": 100000},
      {"name": "Notebooks", "value": 55000},
      {"name": "Estufas", "value": 15000},
      {"name": "Televisores", "value": 150000},
      {"name": "Refrigeradores", "value": 20000},
    ]
  }

  getTopRated() {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<{ok: boolean, data: {name: string, value: number}[]}>(`${this.apiUrl}/productos/top-rated`, { headers }).pipe(
      map(resp => resp.data)
    );
  }
}

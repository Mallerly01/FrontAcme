import { Component, inject, signal } from '@angular/core';
import { ProductSalesAnalytics } from '../../services/product-sales-analytics';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-product-sales',
  imports: [NgxChartsModule],
  templateUrl: './product-sales.html',
  styleUrl: './product-sales.css',
})
export class ProductSales {
  colorScheme: any = {
    domain:['#1C55FF', '#03A9F4', '#FFCC80', '#FFA07A', '#F54927']
  }
  productSalesAnalytics = inject(ProductSalesAnalytics);
  saleData = signal<{name: string, value: number}[]>([]);
  topRatedData = signal<{name: string, value: number}[]>([]);

  ngOnInit(): void {
    this.saleData.set(this.productSalesAnalytics.getSales());
    this.productSalesAnalytics.getTopRated().subscribe({
      next: (data) => this.topRatedData.set(data),
      error: (err) => console.error('Error al obtener top rated:', err)
    });
  }
}

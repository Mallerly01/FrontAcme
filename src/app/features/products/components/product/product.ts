import { Component, signal, computed, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { Product as ProductService} from '../../services/product';
import { ProductList } from './product-list/product-list';
import { ModalAdd } from './modal-add/modal-add';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Auth } from '../../../auth/services/auth';

@Component({
  selector: 'app-product',
  imports: [
    ModalAdd,
    ProductList,
    FormsModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  listFilter = signal('');
  isModalOpen= signal(false);
  private authService = inject(Auth);

  constructor (public productService: ProductService){}

  ngOnInit(): void{
    this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.productService.products.set(products);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        if (err.status === 401) {
          this.authService.logout();
        }
      }
    });
  }

  filteredProducts = computed(() =>
    this.productService.products().filter(p =>
      p.productName.toLowerCase().includes(this.listFilter().toLowerCase()))
  );

  abrirModal(){
    console.log('abriendo modal');
    this.isModalOpen.set(true);
    console.log(this.isModalOpen());
  }

  cerrarModal(){
    this.isModalOpen.set(false);
    this.productService.getProducts().subscribe(products =>
      this.productService.products.set(products)
    );
  }

  guardarProducto(product: IProduct){
    console.log('Guardando producto', product);
    this.productService.saveProduct(product).pipe(
      switchMap(() => this.productService.getProducts())
    ).subscribe(products => this.productService.products.set(products))
  }

  crearProducto(){
    let datos: any = {
      name: `Nuevo Producto ${Math.round(Math.random() * (100 - 1) + 1)}`,
      code: this.productService.generateProductCode(),
      date: '2024-01-01',
      price: Math.round(Math.random() * (200 - 1) + 1),
      description: 'Descripcion del producto nuevo',
      rate: Math.round(Math.random() * (200 - 1) + 1),
      image: 'gmuza_hush.png'
    }
    this.guardarProducto(datos);
  }

}

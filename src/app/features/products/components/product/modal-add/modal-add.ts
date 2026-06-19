import { Component, inject, output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product as ProductService } from '../../../services/product';

@Component({
  selector: 'app-modal-add',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add.html',
  styleUrl: './modal-add.css',
})
export class ModalAdd {
  close = output<void>();
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  selectedFile: File | null = null;
  imagenPreview: string | null = null;

  formProduct = this.fb.group({
    name: ['', Validators.required],
    code: ['', [Validators.required, Validators.minLength(7)], this.codeValidator()],
    date: ['', Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(200)]],
  });

  codeValidator(): AsyncValidatorFn{
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      let code = control.value;
      return this.productService.searchProduct(code)
        .pipe(
          map(res => {
            if (res){
              return { codeExists: true};
            }
            return null;
          }),
          catchError(() => of(null))
        );
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveData(){
    if (this.formProduct.invalid) return;

    const formData = new FormData();
    formData.append('name', this.formProduct.value.name || '');
    formData.append('code', this.formProduct.value.code || '');
    formData.append('date', this.formProduct.value.date || '');
    formData.append('price', String(this.formProduct.value.price || 0));
    formData.append('description', this.formProduct.value.description || '');
    formData.append('rate', String(this.formProduct.value.rating || 0));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.saveProductWithImage(formData).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (err) => {
        console.error('Error al guardar producto:', err);
      }
    });
  }

  ocultarModal(){
    this.close.emit();
  }
}

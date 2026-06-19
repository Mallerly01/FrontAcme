import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { Product } from './product';

describe('Product', () => {
  let service: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(Product);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

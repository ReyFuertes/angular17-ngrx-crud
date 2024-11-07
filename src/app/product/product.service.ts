
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './product-base.service';
import { IProduct } from './product.model';


@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<IProduct> {
  constructor(http: HttpClient) {
    super(http, 'product');
  }
}

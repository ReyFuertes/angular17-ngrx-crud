import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../../store/product.reducer';
import { getProductsAction } from '../../store/product.action';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent {
  constructor(private store: Store<ProductState>) {
    this.store.dispatch(getProductsAction());
  }
}

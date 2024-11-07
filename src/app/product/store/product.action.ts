import { createAction, props } from "@ngrx/store";
import { IProduct } from "../product.model";

export enum ProductTypes {
  getProductsAction = '[product] get products',
  getProductsSuccessAction = '[product] get products (success)',
  updateProductAction = '[product] update product',
  updateProductSuccessAction = '[product] update product (success)',
  deleteProductAction = '[product] delete product',
  deleteProductSuccessAction = '[product] delete product (success)',
}
export const deleteProductAction = createAction(
  ProductTypes.deleteProductAction,
  props<{ payload: IProduct }>()
);
export const deleteProductSuccessAction = createAction(
  ProductTypes.deleteProductSuccessAction,
  props<{ response: IProduct }>()
);
export const updateProductAction = createAction(
  ProductTypes.updateProductAction,
  props<{ payload: IProduct }>()
);
export const updateProductSuccessAction = createAction(
  ProductTypes.updateProductSuccessAction,
  props<{ response: IProduct }>()
);
export const getProductsAction = createAction(
  ProductTypes.getProductsAction
);
export const getProductsSuccessAction = createAction(
  ProductTypes.getProductsSuccessAction,
  props<{ response: IProduct[] }>()
);
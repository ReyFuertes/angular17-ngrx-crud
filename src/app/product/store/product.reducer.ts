import { createReducer, on, Action } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import { IProduct } from "../product.model";
import { deleteProductSuccessAction, getProductsSuccessAction, updateProductSuccessAction } from "./product.action";

export interface ProductState extends EntityState<IProduct> {
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({});
export const initialState: ProductState = adapter.getInitialState({
});
const productReducer = createReducer(
  initialState,
  on(deleteProductSuccessAction, (state, action) => {
    return adapter.removeOne(action.response.id, state);
  }),
  on(updateProductSuccessAction, (state, action) => {
    return adapter.updateOne({ id: action.response.id, changes: action.response }, state)
  }),
  on(getProductsSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  })
);
export function ProductReducer(state: ProductState, action: Action) {
  return productReducer(state, action);
}
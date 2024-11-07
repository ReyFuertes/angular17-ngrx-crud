import { createSelector } from "@ngrx/store";


export const selectedState = (state: any) => state;
export const getProductById = (id: number) => createSelector(
  selectedState, (state) => state.product.entities[id]
);
export const getProductsSelector = createSelector(
  selectedState, state => {
    return state
      ? Object.values(state?.product?.entities)
      : [];
  }
);
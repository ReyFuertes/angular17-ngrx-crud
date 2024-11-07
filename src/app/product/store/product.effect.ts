import { Injectable, Injector } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, of, switchMap } from "rxjs";


import { ProductService } from "../product.service";
import { deleteProductAction, deleteProductSuccessAction, getProductsAction, getProductsSuccessAction, updateProductAction, updateProductSuccessAction } from "./product.action";
import { IProduct } from "../product.model";
import { productsMock } from "../product.mock";


@Injectable()
export class ProductEffects {
  deleteProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProductAction),
    switchMap(({ payload }) => of(payload)
      .pipe(
        map((response: IProduct) => deleteProductSuccessAction({ response }))
      ))
  ));
  updateProductsAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateProductAction),
    switchMap(({ payload }) => of(payload)
      .pipe(
        map((response: IProduct) => updateProductSuccessAction({ response }))
      ))
  ));

  getProductsAction$ = createEffect(() => this.actions$.pipe(
    ofType(getProductsAction),
    switchMap(() => of(productsMock)
      .pipe(
        map((response: IProduct[]) => getProductsSuccessAction({ response }))
      ))
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductService) { }
}
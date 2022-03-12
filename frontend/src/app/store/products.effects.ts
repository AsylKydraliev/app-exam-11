import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  createProductFailure,
  createProductRequest, createProductSuccess,
  fetchProductByIdFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess, fetchProductOneFailure, fetchProductOneRequest, fetchProductOneSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess
} from './products.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
  fetchProducts = createEffect(() => this.actions.pipe(
    ofType(fetchProductsRequest),
    mergeMap(() => this.productsService.getProducts().pipe(
      map(products => fetchProductsSuccess({products})),
      catchError(() => {
        return of(fetchProductsFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  fetchProductsById = createEffect(() => this.actions.pipe(
    ofType(fetchProductByIdRequest),
    mergeMap(id => this.productsService.getProductsByCategory(id._id).pipe(
      map(products => fetchProductByIdSuccess({products})),
      catchError(() => {
        return of(fetchProductByIdFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  fetchProductOne = createEffect(() => this.actions.pipe(
    ofType(fetchProductOneRequest),
    mergeMap(id => this.productsService.getOneProduct(id._id).pipe(
      map(product => fetchProductOneSuccess({product})),
      catchError(() => {
        return of(fetchProductOneFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  createProduct = createEffect(() => this.actions.pipe(
    ofType(createProductRequest),
    mergeMap(({productData}) => this.productsService.createProduct(productData).pipe(
      map(product => createProductSuccess({product})),
      tap(() => {
        void this.router.navigate(['/']);
        this.snackbar.open('Post published', 'OK', {duration: 3000});
      }),
      catchError(() => {
        return of(createProductFailure({error: 'Something went wrong!'}));
      })
    ))
  ))

  constructor(
    private productsService: ProductsService,
    private actions: Actions,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}

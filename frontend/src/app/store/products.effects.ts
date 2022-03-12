import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  fetchProductsFailure,
  fetchProductsRequest, fetchProductsSuccess
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

  // fetchPostById = createEffect(() => this.actions.pipe(
  //   ofType(fetchPostByIdRequest),
  //   mergeMap(id => this.postsService.getPostById(id._id).pipe(
  //     map(post => fetchPostByIdSuccess({post})),
  //     catchError(() => {
  //       return of(fetchPostByIdFailure({error: 'Something went wrong!'}));
  //     })
  //   ))
  // ));

  // createPost = createEffect(() => this.actions.pipe(
  //   ofType(createPostsRequest),
  //   mergeMap(({postData}) => this.postsService.createPost(postData).pipe(
  //     map(post => createPostsSuccess({post})),
  //     tap(() => {
  //       void this.router.navigate(['/']);
  //       this.snackbar.open('Post published', 'OK', {duration: 3000});
  //     }),
  //     catchError(() => {
  //       return of(fetchPostByIdFailure({error: 'Something went wrong!'}));
  //     })
  //   ))
  // ))

  constructor(
    private productsService: ProductsService,
    private actions: Actions,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}

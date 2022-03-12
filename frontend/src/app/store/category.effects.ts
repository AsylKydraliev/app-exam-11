import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { fetchCategoryFailure, fetchCategoryRequest, fetchCategorySuccess } from './category.actions';
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoryEffects {
  fetchCategory = createEffect(() => this.actions.pipe(
    ofType(fetchCategoryRequest),
    mergeMap(() => this.categoryService.getCategory().pipe(
      map(category => fetchCategorySuccess({category})),
      catchError(() => {
        return of(fetchCategoryFailure({error: 'Something went wrong!'}));
      })
    ))
  ));

  constructor(
    private categoryService: CategoryService,
    private actions: Actions,
  ) {}
}

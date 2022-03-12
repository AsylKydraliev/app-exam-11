import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category.model';

export const fetchCategoryRequest = createAction('[CategoryModel] Fetch Request');
export const fetchCategorySuccess = createAction('[CategoryModel] Fetch Success', props<{category: Category[]}>());
export const fetchCategoryFailure = createAction('[CategoryModel] Fetch Failure', props<{error: string}>());

import { CategoryState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchCategoryFailure, fetchCategoryRequest, fetchCategorySuccess } from './category.actions';

const initialState: CategoryState = {
  category: [],
  fetchLoading: false,
  fetchError: null
}

export const categoryReducer = createReducer(
  initialState,
  on(fetchCategoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchCategorySuccess, (state, {category}) => ({...state, fetchLoading: false, category})),
  on(fetchCategoryFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)

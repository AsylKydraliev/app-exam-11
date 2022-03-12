import { createReducer, on } from '@ngrx/store';
import {
  fetchProductByIdFailure,
  fetchProductByIdRequest, fetchProductByIdSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess
} from './products.actions';
import { ProductState } from './types';

const initialState: ProductState = {
  products: [],
  fetchLoading: false,
  fetchError: null,
};

export const productsReducer = createReducer(
  initialState,
  on(fetchProductsRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductsSuccess, (state, {products}) => ({...state, fetchLoading: false, products})),
  on(fetchProductsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(fetchProductByIdRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductByIdSuccess, (state, {products}) => ({...state, fetchLoading: false, products})),
  on(fetchProductByIdFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  // on(createPostsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  // on(createPostsSuccess, (state, {post})  => ({...state, fetchLoading: false, post})),
  // on(createPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)

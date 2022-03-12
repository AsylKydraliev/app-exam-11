import { createReducer, on } from '@ngrx/store';
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
  fetchProductByIdFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductOneFailure,
  fetchProductOneRequest,
  fetchProductOneSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess, removeProductFailure, removeProductRequest, removeProductSuccess
} from './products.actions';
import { ProductState } from './types';

const initialState: ProductState = {
  products: [],
  product: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  removeLoading: false,
  removeError: null
};

export const productsReducer = createReducer(
  initialState,
  on(fetchProductsRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductsSuccess, (state, {products}) => ({...state, fetchLoading: false, products})),
  on(fetchProductsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(fetchProductByIdRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductByIdSuccess, (state, {products}) => ({...state, fetchLoading: false, products})),
  on(fetchProductByIdFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createProductRequest, state => ({...state, createLoading: true, createError: null})),
  on(createProductSuccess, (state, {product})  => ({...state, createLoading: false, product})),
  on(createProductFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(fetchProductOneRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductOneSuccess, (state, {product}) => ({...state, fetchLoading: false, product})),
  on(fetchProductOneFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(removeProductRequest, (state, {id}) => {
    const update = state.products.filter(product => {
      return product.id !== id;
    });

    return {...state, tasks: update, removeLoading: true}
  }),
  on(removeProductSuccess, state => ({...state, removeLoading: false})),
  on(removeProductFailure, (state, {error}) => ({...state, removeLoading: true, fetchError: error})),
)

import { createAction, props } from '@ngrx/store';
import { ApiProductData, Product, ProductData } from '../models/product.model';

export const fetchProductsRequest = createAction('[Products] Fetch Request');
export const fetchProductsSuccess = createAction(
  '[Products] Fetch Success',
  props<{products: Product[]}>()
);
export const fetchProductsFailure = createAction('[Products] Fetch Failure', props<{error: string}>());

export const createProductRequest = createAction('[Product] Create Request', props<{productData: ProductData}>());
export const createProductSuccess = createAction('[Product] Create Success', props<{product: ApiProductData}>());
export const createProductFailure = createAction('[Product] Create Failure', props<{error: {}}>());

export const fetchProductByIdRequest = createAction('[Products] FetchById Request', props<{_id: string}>());
export const fetchProductByIdSuccess = createAction(
  '[Products] FetchById Success',
  props<{products: Product[]}>()
);
export const fetchProductByIdFailure = createAction('[Products] FetchById Failure', props<{error: string}>());

export const fetchProductOneRequest = createAction('[Products] FetchOne Request', props<{_id: string}>());
export const fetchProductOneSuccess = createAction(
  '[Products] FetchOne Success',
  props<{product: ApiProductData | null}>()
);
export const fetchProductOneFailure = createAction('[Products] FetchOne Failure', props<{error: string}>());

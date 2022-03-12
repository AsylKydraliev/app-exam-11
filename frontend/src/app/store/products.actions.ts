import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const fetchProductsRequest = createAction('[Products] Fetch Request');
export const fetchProductsSuccess = createAction('[Products] Fetch Success', props<{products: Product[]}>());
export const fetchProductsFailure = createAction('[Products] Fetch Failure', props<{error: string}>());

// export const createPostsRequest = createAction('[Posts] Create Request', props<{postData: PostData}>());
// export const createPostsSuccess = createAction('[Posts] Create Success', props<{post: Post}>());
// export const createPostsFailure = createAction('[Posts] Create Failure', props<{error: {}}>());
//
// export const fetchPostByIdRequest = createAction('[Posts] FetchById Request', props<{_id: string}>());
// export const fetchPostByIdSuccess = createAction('[Posts] FetchById Success', props<{post: ApiPostData}>());
// export const fetchPostByIdFailure = createAction('[Posts] FetchById Failure', props<{error: string}>());

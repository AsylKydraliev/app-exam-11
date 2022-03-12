import { LoginError, RegisterError, User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';


export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError
};

export type ProductState = {
  products: Product[],
  fetchLoading: boolean,
  fetchError: null | {},
  createLoading: boolean,
  createError: null | {}
};

export type CategoryState = {
  category: Category[],
  fetchLoading: boolean,
  fetchError: null | {},
};

export type AppState = {
  users: UserState,
  products: ProductState,
  category: CategoryState
};

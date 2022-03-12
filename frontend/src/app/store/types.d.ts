import { LoginError, RegisterError, User } from '../models/user.model';
import { Product } from '../models/product.model';


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
};

export type AppState = {
  users: UserState,
  products: ProductState
};

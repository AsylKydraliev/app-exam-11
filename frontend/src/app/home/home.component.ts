import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { fetchProductsRequest } from '../store/products.actions';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { fetchCategoryRequest } from '../store/category.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  products: Observable<Product[]>;
  categories: Observable<Category[]>;
  loading: Observable<boolean>;
  apiUrl = environment.apiUrl;

  constructor(private store: Store<AppState>) {
    this.products = store.select(state => state.products.products);
    this.categories = store.select(state => state.category.category);
    this.loading = store.select(state => state.products.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductsRequest());
    this.store.dispatch(fetchCategoryRequest());
  }

}

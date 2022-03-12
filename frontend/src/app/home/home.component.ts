import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { ApiProductData, Product } from '../models/product.model';
import { fetchProductsRequest } from '../store/products.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  products: Observable<Product[]>;
  loading: Observable<boolean>;
  apiUrl = environment.apiUrl;

  constructor(private store: Store<AppState>) {
    this.products = store.select(state => state.products.products);
    this.loading = store.select(state => state.products.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductsRequest());
  }

}

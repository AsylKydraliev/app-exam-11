import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProductData } from '../models/product.model';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { ActivatedRoute } from '@angular/router';
import { fetchProductOneRequest } from '../store/products.actions';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.sass']
})
export class ProductDataComponent implements OnInit {
  product: Observable<ApiProductData | null>;
  loading: Observable<boolean>;
  apiUrl = environment.apiUrl;
  newProduct!: ApiProductData;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.product = store.select(state => state.products.product);
    this.loading = store.select(state => state.products.fetchLoading);
  }

  ngOnInit(): void {
    this.product.subscribe(p => {
      this.newProduct = <ApiProductData>p;
    })
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchProductOneRequest({_id: params['id']}));
    });
  }
}

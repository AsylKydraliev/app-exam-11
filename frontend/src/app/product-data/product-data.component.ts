import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProductData } from '../models/product.model';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { ActivatedRoute } from '@angular/router';
import { fetchProductOneRequest, removeProductRequest } from '../store/products.actions';
import { User } from '../models/user.model';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.sass']
})
export class ProductDataComponent implements OnInit {
  product: Observable<ApiProductData | null>;
  loading: Observable<boolean>;
  user: Observable<User | null>;
  apiUrl = environment.apiUrl;
  newProduct!: ApiProductData;
  userData!: User | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.product = store.select(state => state.products.product);
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.products.fetchLoading);
  }

  ngOnInit(): void {
    this.product.subscribe(product => {
      this.newProduct = <ApiProductData>product;
    });
    this.user.subscribe(user => {
      this.userData = user;
    })
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchProductOneRequest({_id: params['id']}));
    });
  }

  remove(_id: string) {
    this.store.dispatch(removeProductRequest({id: _id, token: <string>this.userData?.token}))
  }
}

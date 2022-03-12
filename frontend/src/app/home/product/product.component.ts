import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchProductByIdRequest } from '../../store/products.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;
  loading: Observable<boolean>;
  apiUrl = environment.apiUrl;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.products = store.select(state => state.products.products);
    this.loading = store.select(state => state.products.fetchLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchProductByIdRequest({_id: params['id']}));
    });
  }
}

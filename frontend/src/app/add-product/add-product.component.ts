import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Category } from '../models/category.model';
import { fetchCategoryRequest } from '../store/category.actions';
import { createProductRequest } from '../store/products.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit{
  @ViewChild('f') form!: NgForm;
  user: Observable<User | null>;
  newUser!: User;
  categories: Observable<Category[]>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.categories = store.select(state => state.category.category);
    this.user.subscribe(user => {
      this.newUser = <User>user;
    });
  }

  ngOnInit(){
    this.store.dispatch(fetchCategoryRequest());
  }

  onSubmit() {
    const productValue = this.form.value;
    const product = {
      title: productValue.title,
      description: productValue.description,
      image: productValue.image,
      price: productValue.price,
      category: productValue.category,
      token: this.newUser.token,
      user: this.newUser._id
    }
    this.store.dispatch(createProductRequest({productData: product}));
  }

}

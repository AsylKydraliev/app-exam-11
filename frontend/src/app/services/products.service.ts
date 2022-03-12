import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProductData, Product, ProductData } from '../models/product.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ApiProductData[]>(environment.apiUrl + '/products').pipe(
      map(response => {
        return response.map(productData => {
          return new Product(
            productData._id,
            productData.title,
            productData.price,
            productData.description,
            productData.image,
            productData.category,
            productData.user,
          );
        });
      })
    );
  }

  getProductsByCategory(id: string) {
    return this.http.get<ApiProductData[]>(environment.apiUrl + '/products?category=' + id).pipe(
      map(response => {
        return response.map(productData => {
          return new Product(
            productData._id,
            productData.title,
            productData.price,
            productData.description,
            productData.image,
            productData.category,
            productData.user,
          );
        });
      })
    );
  }

  getOneProduct(id: string) {
    return this.http.get<ApiProductData>(environment.apiUrl + '/products/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

  removeProduct(id: string, token: string) {
    return this.http.delete(environment.apiUrl + '/products/' + id, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }

  createProduct(productData: ProductData) {
    const formData = new FormData();

    Object.keys(productData).forEach(key => {
      if (productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    return this.http.post<ApiProductData>(environment.apiUrl + '/products', formData, {
      headers: new HttpHeaders({'Authorization': productData.token})
    });
  }
}

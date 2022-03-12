import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category, CategoryApi } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get<CategoryApi[]>(environment.apiUrl + '/categories').pipe(
      map(response => {
        return response.map(data => {
          return new Category(
            data._id,
            data.title
          );
        });
      })
    );
  }
}

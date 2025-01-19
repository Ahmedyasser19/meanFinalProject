import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  getProduct(): Observable<any> {
    return this.http.get(environment.apiURL + 'products');
  }

  addProduct(model: Product): Observable<any> {
    return this.http.post(environment.apiURL + 'products', model, {
      headers: this.httpHeaders,
    });
  }
}
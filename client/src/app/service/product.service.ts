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

  getHttpHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(environment.apiURL + 'products');
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(environment.apiURL + 'products/' + id);
  }

  addProduct(model: FormData, productId?: string): Observable<any> {
    return productId
      ? this.http.put(environment.apiURL + 'products/' + productId, model, {
          headers: this.getHttpHeaders(),
        })
      : this.http.post(environment.apiURL + 'products', model, {
          headers: this.getHttpHeaders(),
        });
  }

  removeProduct(productId: string): Observable<any> {
    return this.http.delete(environment.apiURL + 'products/' + productId,{
      headers: this.getHttpHeaders(),
    });
  }
}

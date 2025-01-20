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

  getProduct(): Observable<any> {
    return this.http.get(environment.apiURL + 'products', {
      headers: this.getHttpHeaders(),
    });
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(environment.apiURL + 'products', formData, {
      headers: this.getHttpHeaders(),
    });
  }
  updateProduct(productId: string, formData: FormData): Observable<any> {
    return this.http.put(
      `${environment.apiURL}products/${productId}`,
      formData,
      {
        headers: this.getHttpHeaders(),
      }
    );
  }
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${environment.apiURL}products/${productId}`, {
      headers: this.getHttpHeaders(),
    });
  }
}

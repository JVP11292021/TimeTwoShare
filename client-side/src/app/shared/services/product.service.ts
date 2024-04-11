import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STORED_NAME } from '../globals';
import { PersistanceStorageService } from './persistance-storage.service';

export type Product = {
  name: NamedCurve;
  description: NamedCurve;
  price: number;
  isLent: boolean;
  imgUrl: NamedCurve;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http: HttpClient = inject(HttpClient);
  private storage: PersistanceStorageService = inject(PersistanceStorageService);

  constructor() { }

  store(product: Product) : Observable<number> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.post<number>(
      'http://localhost:8081/t2s/v1/product',
       product,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       });
  }

  getAll() : Observable<Product[]> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.get<Product[]>(
      'http://localhost:8081/t2s/v1/product',
       {
        headers: new HttpHeaders({          
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       });
  }

  update(id: number, product: Product): Observable<boolean> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.put<boolean>(
      `http://localhost:8081/t2s/v1/product/${id}`,
      product,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       })
  }

  removeById(id: number): Observable<boolean> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.delete<boolean>(
      `http://localhost:8081/t2s/v1/product/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       })
  }
}

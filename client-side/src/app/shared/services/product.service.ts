import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Review } from './review.service';

export type Product = {
  name: NamedCurve;
  description: NamedCurve;
  price: number;
  isLent: boolean;
  imgUrl: NamedCurve;
  reviews: Review[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpService = inject(HttpService);

  constructor() { }

  store(product: Product) : Observable<number> {
    return this.httpService.request('http://localhost:8081/t2s/v1/product', 'POST', product);
  }

  getAll() : Observable<Product[]> {
    return this.httpService.request('http://localhost:8081/t2s/v1/product', 'GET');
  }

  update(id: number, product: Product): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/product/${id}`, 'PUT', product);
  }

  removeById(id: number): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/product/${id}`, 'DELETE');
  }

  isProductLent(name: NamedCurve): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/product/${name}`, 'GET');
  }
}

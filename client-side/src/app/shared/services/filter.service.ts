import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private httpService = inject(HttpService);

  constructor() { }

  public getAllOwnedProducts(): Observable<Product[]> {
    return this.httpService.request("http://localhost:8081/t2s/v1/product/filter/owned", 'GET');
  }

  public getAllProductsWithContracts(): Observable<Product[]> {
    return this.httpService.request("http://localhost:8081/t2s/v1/product/filter/contract", 'GET');
  }

  public getAllProductsWithReviews(): Observable<Product[]> {
    return this.httpService.request("http://localhost:8081/t2s/v1/product/filter/reviews", 'GET');
  }

  public getAllProductsWithReviewsAndContract(): Observable<Product[]> {
    return this.httpService.request("http://localhost:8081/t2s/v1/product/filter/reviews-contract", 'GET');
  }

  getAll() : Observable<Product[]> {
    return this.httpService.request('http://localhost:8081/t2s/v1/product', 'GET');
  }
}

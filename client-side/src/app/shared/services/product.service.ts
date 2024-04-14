import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contract } from './contract.service';
import { HttpService } from './http.service';
import { Review } from './review.service';

export type Product = {
  name: NamedCurve;
  description: NamedCurve;
  price: number;
  isLent: boolean;
  imgUrl: NamedCurve;
  reviews: Review[];
  contract: Contract | null;
}

export function buildProduct(group: FormGroup): Product {
  return {
    name: group.value.name,
    description: group.value.description,
    price: group.value.price,
    isLent: false,
    imgUrl: group.value.imgUrl,
    reviews: [],
    contract: null
  };
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

  getByName(name: NamedCurve): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/product/${name}`, 'GET');
  }


  popup(name: NamedCurve, contract: Contract): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/product/contract/${name}`, 'PATCH', contract);
  }
}

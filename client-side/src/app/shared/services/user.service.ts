import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Product } from './product.service';

export type User = {
  id: number;
  firstname: NamedCurve;
  lastname: NamedCurve;
  email: NamedCurve;
  password: NamedCurve;
  role: 'USER' | 'MANAGER' | 'ADMIN';
  tokens: any[];
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpService = inject(HttpService);

  constructor() { }

  getAll(): Observable<User[]> {
    return this.httpService.request("http://localhost:8081/t2s/v1/user", "GET");
  }

  getOwnedProducts(): Observable<Product[]> {
    return this.httpService.request("http://localhost:8081/t2s/v1/user/owned", "GET");
  }

  popup(model: Product) : Observable<unknown> {
    return this.httpService.request("http://localhost:8081/t2s/v1/user/products", "PATCH", model);
  }

}

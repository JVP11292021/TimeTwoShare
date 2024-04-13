import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpService = inject(HttpService);

  constructor() { }

  update(model: Product) : Observable<unknown> {
    return this.httpService.request("http://localhost:8081/t2s/v1/user/products", "PATCH", model);
  }

}

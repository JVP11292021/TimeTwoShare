import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Product } from './product.service';

export type Contract = {
  beginDate: Date;
  endDate: Date;
  lendingPrice: number;
  product: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private httpService = inject(HttpService);

  constructor() { }

  store(contract: Contract) : Observable<number> {
    return this.httpService.request('http://localhost:8081/t2s/v1/contract', 'POST', contract);
  }

  getAll() : Observable<Contract[]> {
    return this.httpService.request('http://localhost:8081/t2s/v1/contract', 'GET');
  }

  update(id: number, contract: Contract): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/contract/${id}`, 'PUT', contract);
  }

  removeById(id: number): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/contract/${id}`, 'DELETE');
  }
}

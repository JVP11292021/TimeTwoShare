import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STORED_NAME } from '../globals';
import { PersistanceStorageService } from './persistance-storage.service';

export type Contract = {
  
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private http = inject(HttpClient);
  private storage = inject(PersistanceStorageService);

  constructor() { }

  store(contract: Contract): Observable<number> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.post<number>(
      'http://localhost:8081/t2s/v1/contract',
       contract,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       });
  }

  getAll(): Observable<Contract[]> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.get<Contract[]>(
      'http://localhost:8081/t2s/v1/contract',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       })
  } 

  update(id: number, contract: Contract): Observable<boolean> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.put<boolean>(
      `http://localhost:8081/t2s/v1/contract/${id}`,
      contract,
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
      `http://localhost:8081/t2s/v1/contract/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       })
  }
}

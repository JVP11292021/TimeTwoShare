import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STORED_NAME } from '../globals';
import { PersistanceStorageService } from './persistance-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);
  private storage = inject(PersistanceStorageService);

  constructor() { }

  request<T extends object, TReturn>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    bodyData?: T
  ): Observable<TReturn> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.request<TReturn>(method, url, {
      body: bodyData,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    });
  }
}

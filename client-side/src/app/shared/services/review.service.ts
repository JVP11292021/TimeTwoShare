import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STORED_NAME } from '../globals';
import { PersistanceStorageService } from './persistance-storage.service';

export type Review = {
  rating: number;
  reviewText: NamedCurve;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private http = inject(HttpClient);
  private storage = inject(PersistanceStorageService);

  constructor() { }

  store(review: Review): Observable<number> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.post<number>(
      'http://localhost:8081/t2s/v1/review',
       review,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       });
  }

  getAll(): Observable<Review[]> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.get<Review[]>(
      'http://localhost:8081/t2s/v1/review',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       })
  } 

  update(id: number, review: Review): Observable<boolean> {
    const token = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
    return this.http.put<boolean>(
      `http://localhost:8081/t2s/v1/review/${id}`,
      review,
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
      `http://localhost:8081/t2s/v1/review/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
       })
  }
}

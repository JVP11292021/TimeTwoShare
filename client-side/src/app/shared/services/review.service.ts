import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export type Review = {
  rating: number;
  reviewText: NamedCurve;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private httpService = inject(HttpService);

  constructor() { }

  store(review: Review) : Observable<number> {
    return this.httpService.request('http://localhost:8081/t2s/v1/review', 'POST', review);
  }

  getAll() : Observable<Review[]> {
    return this.httpService.request('http://localhost:8081/t2s/v1/review', 'GET');
  }

  update(id: number, review: Review): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/review/${id}`, 'PUT', review);
  }

  removeById(id: number): Observable<boolean> {
    return this.httpService.request(`http://localhost:8081/t2s/v1/review/${id}`, 'DELETE');
  }
}

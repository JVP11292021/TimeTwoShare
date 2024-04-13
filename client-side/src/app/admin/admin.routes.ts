import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { ReviewsComponent } from './reviews/reviews.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      }
    ]
  }
];


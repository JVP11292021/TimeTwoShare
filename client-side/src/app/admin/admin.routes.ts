import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      }
    ]
  }
];


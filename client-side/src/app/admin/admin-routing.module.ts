import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductsComponent } from './products/products.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        children: [
          {
            path: 'products',
            component: ProductsComponent
          },
          {
            path: 'my-products',
            component: MyProductsComponent
          },
          {
            path: 'reviews',
            component: ReviewsComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

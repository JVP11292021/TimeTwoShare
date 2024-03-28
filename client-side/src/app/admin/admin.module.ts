import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MaterialExpandedModule } from '../shared/material/material-expanded.module';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
  declarations: [
    AdminComponent,
    HomePageComponent,
    ProductsComponent,
    MyProductsComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialExpandedModule,
    MaterialModule,
    RouterModule
  ]
})
export class AdminModule { }

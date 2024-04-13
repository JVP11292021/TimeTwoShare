import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STORED_NAME } from 'src/app/shared/globals';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PersistanceStorageService } from 'src/app/shared/services/persistance-storage.service';
import { Product, ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialExpandedModule,
    RouterModule,
    MaterialModule,
  ]
})
export class ProductsComponent implements OnInit {
  
  public products$!: Observable<Product[]>

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadAllProducts();
    this.products$.subscribe((res) => console.log(res));
  }

  loadAllProducts() {
    this.products$ = this.productService.getAll();
  }

}

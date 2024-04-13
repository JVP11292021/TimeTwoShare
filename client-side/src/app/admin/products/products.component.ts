import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { Product, build, ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ProductPopUpComponent } from './product-pop-up.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialExpandedModule,
    MaterialModule,
    RouterModule,
    MaterialModule,
  ]
})
export class ProductsComponent implements OnInit {
  
  public products$!: Observable<Product[]>

  private productService = inject(ProductService);
  private popUpService = inject(PopUpService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadAllProducts();
    this.products$.subscribe((res) => console.log(res));
  }

  loadAllProducts() {
    this.products$ = this.productService.getAll();
  }

  openProductPopUp() {
    var popup = this.popUpService.openPopup({service: this.userService, build: build}, ProductPopUpComponent)
    popup.afterClosed()
    .subscribe((res)=>console.log(res))
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { buildContract, ContractService } from 'src/app/shared/services/contract.service';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { Product, buildProduct, ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ContractPopUpComponent } from './contract-pop-up.component';
import { MoreInfoPopUpComponent } from './more-info-pop-up.component';
import { ProductPopUpComponent } from './product-pop-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ReviewPopUpComponent } from './review-pop-up.component';
import { buildReview, ReviewService } from 'src/app/shared/services/review.service';
import { WarningPopUpComponent } from './warning-pop-up.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialExpandedModule,
    MaterialModule,
    RouterModule,
    MaterialModule,
  ]
})
export class ProductsComponent implements OnInit {
  
  public products$!: Observable<Product[]>
  public ownedProducts: Product[] = [];
  public option: string = '';

  private contractService = inject(ContractService);
  private reviewService = inject(ReviewService);
  private productService = inject(ProductService);
  private popUpService = inject(PopUpService);
  private userService = inject(UserService);
  private filterService = inject(FilterService);

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.products$ = this.filterService.getAll();
    this.loadOwnedProducts();
  }

  filter() {
    switch (this.option) {
      case 'AllProducts':
        this.products$ = this.filterService.getAll();
        break;
      case 'ByContract':
        this.products$ = this.filterService.getAllProductsWithContracts();
        break;
      case 'ByReviews':
        this.products$ = this.filterService.getAllProductsWithReviews();
        break;
      case 'OwnedProducts':
        this.products$ = this.filterService.getAllOwnedProducts();
        break;
      default:
        this.products$ = this.filterService.getAll();
        break;
    }
    this.loadOwnedProducts();
  }

  private loadOwnedProducts() {
    this.filterService.getAllOwnedProducts()
    .subscribe((res) => {
      this.ownedProducts = res;
    })
  }

  isProductOwned(product: Product): boolean {
    return this.ownedProducts.some(p => p.name === product.name);
  }

  openProductPopUp() {
    var popup = this.popUpService.openPopup({service: this.userService, build: buildProduct}, ProductPopUpComponent)
    popup.afterClosed()
    .subscribe((res) => {
      if (res == 1) {
        this.products$ = this.filterService.getAll();
        this.loadOwnedProducts();
      }
    });
  }

  openContractPopUp(name: string, price: number) {
    var popup = this.popUpService.openPopup({
      service: this.productService,
      build: buildContract,
      productName: name,
      productPrice: price
    }, ContractPopUpComponent)
    popup.afterClosed()
    .subscribe((res) => {
      if (res) 
        this.products$ = this.filterService.getAll();
    });
  }

  openAddReviewPopUp(name: string) {
    var popup = this.popUpService.openPopup({
      service: this.reviewService,
      build: buildReview,
      productName: name
    }, ReviewPopUpComponent)
    popup.afterClosed()
    .subscribe((res) => {
      if (res)
        this.products$ = this.filterService.getAll();
    });
  }

  openMoreInfoPopUp(product: Product) {
    var popup = this.popUpService.openPopup<any>({model: product}, MoreInfoPopUpComponent)
    popup.afterClosed().subscribe();
  }

  openWarningPopUp(name: string) {
    var popup = this.popUpService.openPopup<any>({service: this.contractService, name: name}, WarningPopUpComponent)
    popup.afterClosed().subscribe((res) => {
      if (res)
        this.products$ = this.filterService.getAll();
    });
  }

}

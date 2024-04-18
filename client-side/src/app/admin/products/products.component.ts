import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { buildContract } from 'src/app/shared/services/contract.service';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { Product, buildProduct, ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ContractPopUpComponent } from './contract-pop-up.component';
import { MoreInfoPopUpComponent } from './more-info-pop-up.component';
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
    this.userService.getAll().subscribe((res) => console.log(res));
  }

  loadAllProducts() {
    this.products$ = this.productService.getAll();
  }

  openProductPopUp() {
    var popup = this.popUpService.openPopup({service: this.userService, build: buildProduct}, ProductPopUpComponent)
    popup.afterClosed()
    .subscribe((res)=>console.log(res));
  }

  openContractPopUp(name: string) {
    var popup = this.popUpService.openPopup({service: this.productService, build: buildContract, productName: name}, ContractPopUpComponent)
    popup.afterClosed()
    .subscribe((res) => console.log(res));
  }

  openMoreInfoPopUp(product: Product) {
    var popup = this.popUpService.openPopup<any>({model: product}, MoreInfoPopUpComponent)
    popup.afterClosed()
    .subscribe((res) => console.log(res));
  }
}

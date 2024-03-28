import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialExpandedModule,
    RouterModule,
    MaterialModule,
  ]
})
export class MyProductsComponent {

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialExpandedModule,
    RouterModule,
    MaterialModule,
  ]
})
export class ReviewsComponent {

}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Review, ReviewService } from 'src/app/shared/services/review.service';

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
export class ReviewsComponent implements OnInit {

  private reviewService = inject(ReviewService);

  public reviews$!: Observable<Review[]>;

  ngOnInit() {
    this.reviews$ = this.reviewService.getAll();
  }
}

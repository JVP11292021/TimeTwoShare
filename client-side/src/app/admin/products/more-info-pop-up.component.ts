import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-more-info-pop-up',
  template: `
      <div class="product-info">
        <h2 class="text">{{ model.name }}</h2>
        <p class="text">{{ model.description }}</p>
        <p class="text">Price: {{ model.price | currency }}</p>
        <p *ngIf="model.lent" class="text">This product is currently lent out.</p><br>
        <div *ngIf="model.contract">
          <h3 class="text"><strong>Contract Details</strong></h3>
          <p class="text">Begin Date: {{ model.contract.beginDate | date }}</p>
          <p class="text">End Date: {{ model.contract.endDate | date }}</p>
        </div><br>
        <h3 *ngIf="model.reviews.length > 0" class="text"><strong>Reviews</strong></h3>
        <mat-list *ngIf="model.reviews.length > 0">
          <mat-list-item *ngFor="let review of model.reviews">
            <div class="rating">
              <span class="star" *ngFor="let _ of getStars(review.rating)">&#9733;</span>
            </div>
            <div class="comment-text">
              <p>{{ review.reviewText }}</p>
            </div>
          </mat-list-item>
        </mat-list>
      </div>
      <button mat-icon-button (click)="closepopup()"><mat-icon>close</mat-icon></button>
  `,
  styles: [
    `
    .product-info {
      text-align: center;
    }

    .text {
      color: #fff; /* Set text color to white */
    }

    button {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .rating {
      color: #f1c40f; /* Star color */
      font-size: 20px;
    }

    .star {
      margin-right: 5px;
    }

    .comment-text {
      margin-left: 30px; /* Indent comment text */
    }
    `,
  ]
})
export class MoreInfoPopUpComponent <T> implements OnInit {

  private dialogData = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<MoreInfoPopUpComponent<T>>)

  private inputData!: any;
  public model!: Product; 

  ngOnInit() {
    this.inputData = this.dialogData;
    if ('model' in this.inputData && this.inputData.model != null) 
      this.model = this.inputData.model;
  }

  getStars(rating: number): number[] {
    return Array.from({ length: Math.floor(rating) }, (_, index) => index);
  }

  public closepopup(): void;
  public closepopup(response: unknown): void;
  public closepopup(response?: unknown): void {
    if (response !== undefined) 
      this.ref.close(response);
    else 
      this.ref.close("Closed with function");
  }

}

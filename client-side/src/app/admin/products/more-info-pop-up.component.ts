import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-more-info-pop-up',
  template: `
    <div class="more-info-container">
      <div class="product-info">
        <h2 class="text">{{ model.name }}</h2>
        <p class="text">{{ model.description }}</p>
        <p class="text">Price: {{ model.price | currency }}</p>
        <p *ngIf="model.isLent" class="text">This product is currently lent out.</p>
        <h3 class="text">Reviews</h3>
        <mat-list>
          <mat-list-item *ngFor="let review of model.reviews">
            <div class="rating">
              <span class="star" *ngFor="let _ of getStars(review.rating)">&#9733;</span>
            </div>
            <div class="comment-text">
              <p>{{ review.reviewText }}</p>
            </div>
          </mat-list-item>
        </mat-list>
        <div *ngIf="model.contract">
          <h3>Contract Details</h3>
          <p>{{ model.contract }}</p>
        </div>
      </div>
      <button mat-icon-button (click)="closepopup()"><mat-icon>close</mat-icon></button>
    </div>
  `,
  styles: [
    `
    .more-info-container {
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      margin: auto;
    }

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

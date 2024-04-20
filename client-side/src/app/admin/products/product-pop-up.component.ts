import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-pop-up',
  template: `
    <form [formGroup]="group" (ngSubmit)="save()">
      <h1 mat-dialog-title>Add product to lend</h1>
      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>Name:</mat-label>
          <input matInput type="text" formControlName="name">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Description:</mat-label>
          <input matInput type=text id="description" formControlName="description">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Price:</mat-label>
          <input matInput type="number" formControlName="price">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Image URL:</mat-label>
          <input matInput type="text" formControlName="imgUrl">
        </mat-form-field>
      </div>

      <div mat-dialog-actions>
          <button mat-raised-button type="submit" color="primary">Save</button>
          <a (click)="closepopup()" mat-raised-button color="warn">Close</a>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class ProductPopUpComponent <
Model,
 T extends {
  service: {
    popup: (object: Model) => Observable<unknown>
  }
  build: (form: FormGroup) => Model 
}> implements OnInit {

  private fb = inject(FormBuilder);
  private dialogData = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<ProductPopUpComponent<Model, T>>)

  private inputData!: T;
  public group!: FormGroup;

  ngOnInit(): void {
    this.inputData = this.dialogData;
    this.group = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      isLent: ['', Validators.required],
      imgUrl: [''],
    })
  }

  public closepopup(): void;
  public closepopup(response: unknown): void;
  public closepopup(response?: unknown): void {
    if (response !== undefined) 
      this.ref.close(response);
    else 
      this.ref.close("Closed with function");
  }

  public save(): void {
    this.inputData.service.popup(this.inputData.build(this.group))
      .subscribe((res: unknown) => {
        this.closepopup(res);
      });
  }
}

// "Http failure response for http://localhost:8081/t2s/v1/user/products: 400 OK"

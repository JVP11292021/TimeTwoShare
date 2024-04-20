import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ContractPopUpComponent } from './contract-pop-up.component';

function rangeValidator(min: number, max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (isNaN(value) || value < min || value > max) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-review-pop-up',
  template: `
    <form [formGroup]="group" (ngSubmit)="save()">
      <h1 mat-dialog-title>Add Review</h1>
      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <input matInput type="text" formControlName="reviewText">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Rating</mat-label>
          <input matInput type="number" formControlName="rating">
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
export class ReviewPopUpComponent <
Model,
 T extends {
  service: {
    popup: (...args: any[]) => Observable<unknown>
  }
  build: (form: FormGroup) => Model 
}>  implements OnInit {

  private fb = inject(FormBuilder);
  private dialogData = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<ContractPopUpComponent<Model, T>>)

  private inputData!: T;
  public group!: FormGroup;

  ngOnInit() {
    this.inputData = this.dialogData;
    this.group = this.fb.group({
      reviewText: ['', [Validators.required, Validators.minLength(15)]],
      rating: ['', [Validators.required, rangeValidator(0.0, 5.0)]]
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
    if ('productName' in this.inputData && this.inputData.productName != null) {
      this.inputData.service.popup(this.inputData.productName, this.inputData.build(this.group))
        .subscribe((res: unknown) => {
          this.closepopup(res);
        });
    }
  }

}

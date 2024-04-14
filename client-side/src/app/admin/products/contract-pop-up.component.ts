import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contract-pop-up',
  template: `
    <form [formGroup]="group" (ngSubmit)="save()">
      <h1 mat-dialog-title>Lend a product</h1>
      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>Begin Date:</mat-label>
          <input matInput [matDatepicker]="beginDatepicker" formControlName="beginDate">
          <mat-datepicker-toggle matSuffix [for]="beginDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #beginDatepicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <mat-label>End Date:</mat-label>
          <input matInput [matDatepicker]="endDatepicker" formControlName="endDate">
          <mat-datepicker-toggle matSuffix [for]="endDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #endDatepicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Lending Price:</mat-label>
          <input matInput type="number" formControlName="lendingPrice">
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
export class ContractPopUpComponent <
Model,
 T extends {
  service: {
    popup: (...args: any[]) => Observable<unknown>
  }
  build: (form: FormGroup) => Model 
}> implements OnInit {

  private fb = inject(FormBuilder);
  private dialogData = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<ContractPopUpComponent<Model, T>>)

  private inputData!: T;
  public group!: FormGroup;

  ngOnInit(): void {
    this.inputData = this.dialogData;
    this.group = this.fb.group({
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      lendingPrice: ['', Validators.required]
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

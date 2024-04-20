import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-warning-pop-up',
  template: `
  <div class="simple-container">
    <p class="text">
      Are you sure you want to return the product? The end user will still need to pay the full price
    </p>
  </div>
  <div class="simple-container">
    <div mat-dialog-actions>
      <button (click)="remove()" mat-raised-button type="submit" color="primary">Yes</button>
      <a (click)="closepopup()" mat-raised-button color="warn">No</a>
    </div>
  </div>
  `,
  styles: [ `
    .simple-container {
      display: flex;
      justify-content: center;
    }

    .text {
      color: #fff
    }
  `]
})
export class WarningPopUpComponent <T extends {
  name: NamedCurve,
  service: {
    removeContract: (name: NamedCurve) => Observable<boolean>
  }
}> implements OnInit {

  private ref = inject(MatDialogRef<WarningPopUpComponent<T>>)
  private dialogData = inject(MAT_DIALOG_DATA);

  public inputData!: T;

  ngOnInit() {
    this.inputData = this.dialogData;
  }

  public closepopup(): void;
  public closepopup(response: unknown): void;
  public closepopup(response?: unknown): void {
    if (response !== undefined) 
      this.ref.close(response);
    else 
      this.ref.close("Closed with function");
  }

  remove() {
    this.inputData.service.removeContract(this.inputData.name)
    .subscribe((res) => this.closepopup(res))
  }

}

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-more-info-pop-up',
  template: `
    <p>
      more-info-pop-up works!
    </p>
  `,
  styles: [
  ]
})
export class MoreInfoPopUpComponent <T> implements OnInit {

  private dialogData = inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<MoreInfoPopUpComponent<T>>)

  private inputData!: any;
  private model!: Product; 

  ngOnInit() {
    this.inputData = this.dialogData;
    if ('model' in this.inputData && this.inputData.model != null) 
      this.model = this.inputData.model;
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

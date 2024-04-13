import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService 
<TContext extends {
  service: { 
    store: (object: any) => Observable<unknown>,
    update: (object: any) => Observable<unknown>
  },
  build: (form: FormGroup) => any 
}>{

  private _dialog = inject(MatDialog);

  constructor() { }

  public openPopup(ctx: TContext, component: any) {
    return this._dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: ctx
    });
  }
}

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private _dialog = inject(MatDialog);

  constructor() { }

  public openPopup<TContext extends {
    service: {
      popup: (...args: any[]) => Observable<unknown>
    },
    build: (form: FormGroup, ...args: any[]) => any 
  }>(ctx: TContext, component: any) {
    return this._dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: ctx
    });
  }
}

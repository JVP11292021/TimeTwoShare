import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // TODO add better route guarding clauses
  if (inject(AuthService).checkToken()) return true;
  inject(Router).navigateByUrl('/');
  return false;
};

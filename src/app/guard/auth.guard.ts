import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isUserAuthorised = localStorage.getItem('jwt_token');
  if (!isUserAuthorised) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};

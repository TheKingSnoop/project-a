import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const isContinue = confirm('Are you sure you wish to continue?');
        if (isContinue) {
          loginService.tokenExpired$.next(true);
        }
      }
      throw error;
    })
  );
};

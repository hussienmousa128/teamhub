import {HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthStateService } from '../auth/auth-state.service';


const shouldSkipAuth = (url : string) =>
    url.includes('/auth/login') || url.includes('/auth/refresh');



export const authInterceptor: HttpInterceptorFn = (req, next) => {


  if(shouldSkipAuth(req.url)){
    return next(req);
  }
  const authService = inject(AuthService);
  const authState = inject(AuthStateService);
  const token = authState.accessToken;
  const tokenToSend = token?
    req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`,
    },
  }): req;
  return next(tokenToSend).pipe(
    catchError( (error : unknown)=>{
      if(error instanceof HttpErrorResponse && error.status === 401){
        return authService.refresh().pipe(
          switchMap( () => {
            const newToken = authState.accessToken;
            const retryReq = newToken ? req.clone({setHeaders:{Authorization: `Bearer ${newToken}`,},}) : req;
            return next(retryReq);

          }),
          catchError((refreshErr) => {authState.logout();return throwError(() => refreshErr)})
        )
      }
      return throwError(()=> error);

    }
    ));


};

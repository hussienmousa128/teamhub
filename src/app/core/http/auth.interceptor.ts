import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../auth/auth-state.service';
const shouldSkipAuth = (url : string) =>
    url.includes('/auth/login') || url.includes('/auth/refresh');


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if(shouldSkipAuth(req.url)){
    return next(req);
  }

  const authState = inject(AuthStateService);
  const token = authState.accessToken;
  if (!token){
      return next(req);
  }

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
}

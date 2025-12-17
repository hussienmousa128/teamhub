import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AppError } from './app-error.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const status = err.status;

      const appError: AppError =
        status === 0
          ? { type: 'network', message: 'تحقق من الإنترنت', status, original: err }
          : status === 401
          ? { type: 'unauthorized', message: 'غير مصرح', status, original: err }
          : status >= 500
          ? { type: 'server', message: 'خطأ بالخادم', status, original: err }
          : { type: 'unknown', message: 'خطأ غير متوقع', status, original: err };

      return throwError(() => appError);
    })
  );
};

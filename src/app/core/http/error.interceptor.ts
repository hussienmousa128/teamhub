import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor : HttpInterceptorFn = (req , next)=>{

  return next(req).pipe(catchError((error : unknown) => {
    let message = "خطأ غير متوقع";
    if (error instanceof HttpErrorResponse){
      if (error.status === 0) {
          message = 'تحقق من الإنترنت';
        } else if (error.status === 401) {
          message = 'غير مصرح';
        } else if (error.status >= 500) {
          message = 'خطأ بالخادم';
        }
    }
    return throwError(() => new Error(message));

  }
  )
  );
}

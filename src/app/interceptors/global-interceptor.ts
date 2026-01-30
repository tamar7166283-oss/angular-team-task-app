import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading-service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const snackBar = inject(MatSnackBar);

  // 1. הפעלת טעינה
  loadingService.show();

  return next(req).pipe(
    // 2. טיפול בשגיאות
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';
      
      if (error.status === 401) errorMessage = 'Session expired, please login again.';
      if (error.status === 400) errorMessage = error.error?.message || 'Invalid request.';
      if (error.status === 500) errorMessage = 'Server error, please try again later.';

      snackBar.open(errorMessage, 'Close', { 
        duration: 4000, 
        panelClass: ['error-snackbar'] 
      });

      return throwError(() => error);
    }),
    
    finalize(() => loadingService.hide())
  );
};



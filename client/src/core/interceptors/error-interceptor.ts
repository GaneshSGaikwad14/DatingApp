import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);  
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              toastService.error(error.error,error.status);
            }
            break;
          case 401:
            toastService.error('Unauthorized');
            break;
            break;    
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
           const navigationExtras:NavigationExtras={state:{error:error.error}};
            router.navigateByUrl('/server-error',navigationExtras);
            break;
          default:
            toastService.error('Something went wrong');
            break;
        }
      }
      throw error;
    }


  )
  );
};

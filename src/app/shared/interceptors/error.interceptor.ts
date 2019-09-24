import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // Authentication dependent functions
        /* if ([401, 403].indexOf(err.status) !== -1 && this.authService.isLoggedIn()) {
          this.authService.logout();
        } */

        const error = err.error.message || err.statusText;

        return throwError(error);
      })
    );
  }
}

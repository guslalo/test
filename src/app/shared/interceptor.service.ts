import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let urlAccount = 'account';
    if (req.url.indexOf(urlAccount) === -1) {
      const token = JSON.parse(localStorage.getItem('token'));
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let data = {};
          // USER BLOCKED BY MULTIPLE LOGIN FAILS
          if (error.error.internalCode === 55) {
            document.location.href = '/blocked-account';
          }
          // TOKEN EXPIRATION / NO AUTHORIZED
          if (error.status === 401) {
            document.location.href = '/';
          } else {
            return throwError(data);
          }
        })
      );
    } else {
      return next.handle(req).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
    }
  }
}

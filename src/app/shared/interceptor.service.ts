import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {} from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';
import { ErrorDialogService } from './error-dialog/error-dialog.service';

// import {ErrorService} from '../my-services/error.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url.toString());
    let urlAccount = 'account';
    let urlLogin = 'access';
    if (req.url.indexOf(urlAccount) === -1) {
      const token = JSON.parse(localStorage.getItem('token'));
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(req).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          /*
          const url_error: string = error.url;

          // BREAK INTERCEPTOR FOR LOGIN | REGISTRATION
          if (url_error.match('^.*(/api/v1/access/|/api/v1/account/).*$')) {
            // console.log('not show interceptor');
            return throwError(error);
          } else {
            // console.log('show interceptor');
            let data = {
              status: error.status,
              reason: error && error.error && error.error.message ? error.error.message : '',
            };
            this.errorDialogService.openDialog(data);
            return throwError(data);
          }*/
          if (error.status === 401) {
            document.location.href = '/';
          } else {
            data = {
              status: error.status,
              reason: error && error.error && error.error.message ? error.error.message : '',
            };
            this.errorDialogService.openDialog(data);
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

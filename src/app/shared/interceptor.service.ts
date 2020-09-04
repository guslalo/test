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
    const token = JSON.parse(localStorage.getItem('token'));
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          document.location.href = '/';
        }

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
        }
      })
    );
    /*
    if(req.url.indexOf(environment.baseUrl) === -1 ) {
    }   else {
      console.log('la peticion es externa')
    }*/

    /*
    AuthHeader(request) {
      const token =  JSON.parse(localStorage.getItem('token'));
        if (
          request.url.search(environment.baseUrl + '/oauth2/token') === 0
        ) {

        } else {
          request = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`
            },
          });
          /*
          request = request.clone({
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            })
          });
        }

      return request;
    }*/
  }
}

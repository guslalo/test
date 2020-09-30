import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpToastrInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          /*
          if (event.status == 200) {
            this.toastr.success('Http Status OK')
          }
          */
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 400 || err.status == 500) {
          this.toastr.error(err.error.message || err.error[0], `Status: ${err.status.toString()}`);
        }
        return throwError(err);
      })
    );
  }
}

import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';
import { environment } from '../../../environments/environment';

//import {ErrorService} from '../my-services/error.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}
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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('la peticion es server propio')
    const token =  JSON.parse(localStorage.getItem('token'));
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      },
    });
    return next.handle(req).pipe(
      retry(1),
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
          document.location.href = '/';
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }
        
        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        //this.errorService.show(errorMessage);
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
   
      /*
    if(req.url.indexOf(environment.baseUrl) === -1 ) {
   
     
    }   else {
      console.log('la peticion es externa')
    }*/
  
    
  }
}
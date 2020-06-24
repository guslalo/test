
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ApisService } from './../services/apis.service';
import { GlobalService } from '../services/urlGlobal.service';
import { LocalStorageSvc } from '../services/localStorage.service';
import { environment } from '../../environments/environment';

import { ReactivarSessionComponent } from '../shared/modals/reactivar-session/reactivar-session.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  private tokenResfrescado: boolean;
  private inteval: any;
  private sso = this.globalService.loginProd;
  public cliente: any;
  public clienteOpciones: any;
  public sessionData = {};
  private tiempo: number;
  private multiclo: boolean;
  reactivar: boolean;
  reactivarSession: MatDialogRef<ReactivarSessionComponent>;
  constructor(
    private authenticationService: AuthenticationService,
    private apisService: ApisService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private globalService: GlobalService,
    private localStorageSvc: LocalStorageSvc) {
    if (sessionStorage.getItem('ejecutivoLogueado')) {
      this.tiempo = 3360000; // 3360000 // 56 minutos
      this.multiclo = false;
      this.timeOut(this.tiempo, this.multiclo);
    } else {
      this.tiempo = 840000; // 840000 // 14 minutos
      this.multiclo = true;
      this.timeOut(this.tiempo, this.multiclo);
    }
  }

  timeOut(tiempo: number, multiciclo: boolean) {
    if (multiciclo) {
      setTimeout(() => {
        let cont = 0;
        const interValoRefresco = setInterval(() => {
          // refresh service
          this.refreshService();
          cont++;
          // penultimo ciclo aviso
          if (cont === 3) {
            setTimeout(() => {
              this.reactivarSession = this.dialog.open(
                ReactivarSessionComponent,
                {
                  width: '630px',
                  id: 'modal-warning',
                  data: {}
                });
              this.reactivarSession.afterClosed().subscribe(result => {
                if (result.reactivar) {
                  cont = 0;
                } else {
                  this.cerrarSession();
                }
              });
            }, tiempo * 0.9); // 
          } else if (cont >= 4) {
            this.cerrarSession();
            clearInterval(interValoRefresco);
          }
        }, tiempo);
      }, 10000); // espera 10 segundos para iniciar el intervalo
    } else {
      this.reactivar = false;
      setTimeout(() => {
        let cont = 0;
        const interValoRefresco = setInterval(() => {
          cont++;

          // plazo tiempo respuesta reactivar
          setTimeout(() => {
            if (cont > 0) {
              this.cerrarSession();
            }
          }, 25000);

          this.reactivarSession = this.dialog.open(
            ReactivarSessionComponent,
            {
              width: '630px',
              id: 'modal-warning',
              data: {}
            }
          );
          this.reactivarSession.afterClosed().subscribe(result => {
            if (result.reactivar) {
              cont = 0;
              this.reactivar = true;
            } else {
              this.reactivar = false;
              this.cerrarSession();
            }
          });
        }, tiempo);
      }, 10000);
    }
  }

  // servicio refhesh
  refreshService() {
    this.authenticationService.refresh_token(this.localStorageSvc.getDatos('refresh_token')).subscribe(
      refreshData => {
        this.localStorageSvc.setDatos('token', refreshData.access_token);
        this.localStorageSvc.setDatos('refresh_token', refreshData.refresh_token);
        // get SessionData
        this.apisService.getSessionData().subscribe(
          data => {
            this.sessionData = {};
            this.sessionData = {
              sessiondata: {
                access_token: this.localStorageSvc.getDatos('token'),
                userSession: {
                  contactType: JSON.parse(data.datos.sessiondata).userSession.contactType,
                  contactId: JSON.parse(data.datos.sessiondata).userSession.contactId,
                  contactName: JSON.parse(data.datos.sessiondata).userSession.contactName,
                  contactMailAddress: JSON.parse(data.datos.sessiondata).userSession.contactMailAddress,
                  contactTelephoneNumber: JSON.parse(data.datos.sessiondata).userSession.contactTelephoneNumber,
                  contactProfile: JSON.parse(data.datos.sessiondata).userSession.contactProfile,
                  cart: null
                },
                customerSession: {
                  customerLegalId: JSON.parse(data.datos.sessiondata).customerSession.customerLegalId,
                  customerDetailsDescription: JSON.parse(data.datos.sessiondata).customerSession.customerDetailsDescription,
                  customerAddressName: JSON.parse(data.datos.sessiondata).customerSession.customerAddressName,
                  customerName: JSON.parse(data.datos.sessiondata).customerSession.customerName,
                  customerLegalName: JSON.parse(data.datos.sessiondata).customerSession.customerLegalName,
                  customerDetailsSegment: JSON.parse(data.datos.sessiondata).customerSession.customerDetailsSegment,
                  executives: JSON.parse(this.localStorageSvc.getDatos('ejecutivosEmpresa'))
                }
              }
            };
            this.apisService.putSessionData(this.sessionData).subscribe(
              putSessionData => {
              },
              error => {
                console.log(<any>error);
              }
            );
          },
          error => {
            console.log(<any>error);
          }
        );
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // cerrar session
  cerrarSession() {
    this.cookieService.delete('executiveSession', '/', environment.dominioCookie);
    this.cookieService.delete('apigee_sessionid', '/', environment.dominioCookie);
    localStorage.removeItem('homeStorage');
    if (!sessionStorage.getItem('ejecutivoLogueado')) {
      document.location.href = environment.logoutUrl;
    } else {
      document.location.href = environment.urlLoginEjecutivo;
    }
  }

  AuthHeader(request) {
    if (
      this.localStorageSvc.getDatos('token')
      && !request.headers.has('Authorization')
      && !request.headers.has('apigee_sessionid')
    ) {
      if (
        request.url.search(environment.dominioURL + '/oauth2/token') === 0 ||
        request.url.search(environment.dominioURL + '/oauth2E/token') === 0 ||
        request.url.search(environment.dominioURL + '/oauth/v2/logout') === 0 ||
        request.url.search(environment.dominioURL + '/SessionData/V1/Updatesessiondata') === 0 ||
        request.url.search(environment.dominioURL + '/SessionData/V1/Retrievesessiondata') === 0
      ) {

      } else {
        request = request.clone({
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.localStorageSvc.getDatos('token')
          })
        });
      }
    }
    return request;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.AuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // .retryWhen()
        if (error.status === 401) {
          document.location.href = this.sso;
          // console.log('error 401');
        }
        if (error.error instanceof Error) {
          // console.error A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', error.error.message);
        }  /*else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
          } */
        // If you want to return a new response:
        // return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        return throwError(error);
        // or just return nothing:
        //return EMPTY;
      })
    );

  }
}
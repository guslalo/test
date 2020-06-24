import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor( private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  
   
   /* if (sessionStorage.getItem('user') === 'medico' || sessionStorage.getItem('user') === 'paciente') {
      return true;
    } else {
      this.router.navigate(['/'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }*/

}
  





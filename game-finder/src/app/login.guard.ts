/*
 * Login Guard Typescript
 * Author: Shawn Nash
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  // Used to keep users from accessing certain pages once they're logged in
  canActivate(): boolean {

    if(sessionStorage.getItem('isLoggedIn') != 'true') {
      return true;
    } else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}

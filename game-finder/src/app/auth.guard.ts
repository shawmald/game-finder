/*
 * Authentication Guard Typescript
 * Author: Shawn Nash
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  // Used to keep users from accessing certain pages unless they're logged in
  canActivate(): boolean {
    if(sessionStorage.getItem('isLoggedIn') == 'true') {
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}

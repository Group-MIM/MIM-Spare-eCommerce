import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { CanActivate } from '@angular/router/src/utils/preactivation';


@Injectable({
  providedIn: 'root'
})
export class AuthNoLoginGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('token') == null) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }

  }

}

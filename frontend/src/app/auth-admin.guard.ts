import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from './services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  role: string;


  constructor(private router: Router, private userService: UserService) { }

  async canActivate() {
    if (localStorage.getItem('token') != null) {
      const result = await this.userService.getUserById(parseInt(localStorage.getItem('token'))).toPromise();

      this.role = result[0]['role'];

      if (this.role == 'admin' || this.role == 'adminges') {

        return true;

      } else {
        this.router.navigateByUrl('/');
        return false;

      }

    } else {
      this.router.navigate(['/']);
      return false;
    }

  }

}

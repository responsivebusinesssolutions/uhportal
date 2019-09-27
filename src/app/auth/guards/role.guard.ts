import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): boolean {
    if (
      activatedRouteSnapshot.data &&
      activatedRouteSnapshot.data.roles &&
      activatedRouteSnapshot.data.roles.indexOf(this.authService.currentUserValue.role) > -1
    ) {
      return true;
    }

    this.router.navigate(['/error']);

    return false;
  }
}

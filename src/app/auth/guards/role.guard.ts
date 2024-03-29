import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth.service';
import { Utils } from 'app/shared/utils/utils';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): boolean {
    const isGuardedRoute: boolean = !!(activatedRouteSnapshot.data && activatedRouteSnapshot.data.roles);

    // Enable routing if route is not role guarded, or
    // user has the proper permission to visit the path
    if (
      !isGuardedRoute ||
      (isGuardedRoute &&
        Utils.arraysIntersect(this.authService.getUserRoles(), activatedRouteSnapshot.data.roles).length > 0)
    ) {
      return true;
    }

    this.router.navigate(['/error']);

    return false;
  }
}

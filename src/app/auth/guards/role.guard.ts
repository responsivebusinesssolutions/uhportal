import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth.service';

import { Role } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // TODO: filter helper function

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): boolean {
    const isGuardedRoute: boolean = !!(activatedRouteSnapshot.data && activatedRouteSnapshot.data.roles);

    // Enable routing if route is not role guarded, or
    // user has the proper permission to visit the path
    if (!isGuardedRoute || (isGuardedRoute && this.hasValidRoles(activatedRouteSnapshot.data.roles))) {
      return true;
    }

    this.router.navigate(['/error']);

    return false;
  }

  private hasValidRoles(roles: Array<Role>): boolean {
    return this.authService.getUserRoles().filter(x => roles.includes(x)).length > 0;
  }
}

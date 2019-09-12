import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate() {
    if (!this.authenticationService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}

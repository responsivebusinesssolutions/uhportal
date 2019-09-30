import { CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.authService.currentUserValue;
  }

  isLoginPage(): boolean {
    return this.router.url.indexOf('/auth/login') > -1;
  }

  isRegisterPage(): boolean {
    return this.router.url.indexOf('/auth/register') > -1;
  }

  onClickLogo(): void {
    this.router.navigate(['/']);
  }

  onLogout(): void {
    if (this.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
  }
}

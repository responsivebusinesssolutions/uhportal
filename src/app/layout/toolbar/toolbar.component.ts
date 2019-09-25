import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToUserEvent();
  }

  isLoggedIn(): boolean {
    return !!this.authService.currentUserValue;
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

  private subscribeToUserEvent(): void {
    this.authService.currentUser.subscribe((currentUser: User) => {
      this.currentUser = currentUser;
    });
  }
}

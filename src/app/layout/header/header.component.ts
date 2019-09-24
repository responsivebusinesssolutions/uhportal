import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToUserEvent();
  }

  isLoggedIn(): boolean {
    return !!this.authService.currentUserValue;
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

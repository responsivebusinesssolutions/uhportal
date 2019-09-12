import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../auth/authentication.service';

import { User } from './../../core/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeToUserEvent();
  }

  onLogout() {
    this.authenticationService.logout();

    this.router.navigate(['/auth/login']);
  }

  private subscribeToUserEvent(): void {
    this.authenticationService.currentUser.subscribe((currentUser: User) => {
      this.currentUser = currentUser;
    });
  }
}

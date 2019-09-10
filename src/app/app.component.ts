import { AuthenticationService } from './core/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './core/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  title = 'uhportal';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}


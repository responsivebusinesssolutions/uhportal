import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../core/services/authentication.service';
import { User } from './../../core/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
     }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}

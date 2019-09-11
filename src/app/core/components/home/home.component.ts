import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './../../interfaces/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  title = 'uhportal';

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


import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigateToDashboard();
    this.subscribeToRouterEvents();
  }

  private navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  private subscribeToRouterEvents(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && this.router.url === '/') {
        this.navigateToDashboard();
      }
    });
  }
}

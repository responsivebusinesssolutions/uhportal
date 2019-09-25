import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
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

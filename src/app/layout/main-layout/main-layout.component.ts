import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private loadingService: LoadingService, private router: Router) {}

  ngOnInit(): void {
    this.navigateToDashboard();
    this.subscribeToRouterEvents();
    this.getLoadingStatus();
  }

  private getLoadingStatus(): void {
    this.isLoading$ = this.loadingService.loadingSubject;
  }

  private navigateToDashboard(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  private subscribeToRouterEvents(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && this.router.url === '/') {
        this.navigateToDashboard();
      }
    });
  }
}

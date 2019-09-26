import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { RouteTransitionLoading } from 'src/app/shared/components/loading/interfaces/route-transition-loading.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnDestroy, OnInit, RouteTransitionLoading {
  isLoading: boolean;
  loadingSubscription: Subscription;

  // TODO: Check async template pipe

  constructor(private loadingService: LoadingService, private router: Router) {}

  ngOnDestroy(): void {
    this.unsubscribeFromRouteTransitionLoadingEvents();
  }

  ngOnInit(): void {
    this.navigateToDashboard();
    this.subscribeToRouterEvents();
    this.subscribeToRouteTransitionLoadingEvents();
  }

  subscribeToLoadingEvents(): void {
    this.loadingSubscription = this.loadingService.loadingEmitter.subscribe((res: boolean) => {
      this.isLoading = res;
    });
  }

  subscribeToRouteTransitionLoadingEvents(): void {
    this.loadingSubscription = this.loadingService.loadingEmitter.subscribe((res: boolean) => {
      this.isLoading = res;
    });
  }

  unsubscribeFromRouteTransitionLoadingEvents(): void {
    this.loadingSubscription.unsubscribe();
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

import { LoadingService } from 'src/app/shared/components/loading/loading.service';

import { Loading } from 'src/app/shared/components/loading/interfaces/loading.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnDestroy, Loading, OnInit {
  isLoading: boolean;
  loadingSubscription: Subscription;

  // TODO: Check async template pipe

  constructor(private loadingService: LoadingService, private router: Router) {}

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.navigateToDashboard();
    this.subscribeToLoadingEvents();
    this.subscribeToRouterEvents();
  }

  subscribeToLoadingEvents(): void {
    this.loadingSubscription = this.loadingService.loadingEmitter.subscribe((res: boolean) => {
      this.isLoading = res;
    });
  }

  unsubscribeFromLoadingEvents(): void {
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

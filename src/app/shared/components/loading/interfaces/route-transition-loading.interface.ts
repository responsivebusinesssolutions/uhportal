import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export interface RouteTransitionLoading extends OnDestroy {
  isLoading: boolean;
  loadingSubscription: Subscription;

  subscribeToRouteTransitionLoadingEvents(): void;
  unsubscribeFromRouteTransitionLoadingEvents(): void;
}

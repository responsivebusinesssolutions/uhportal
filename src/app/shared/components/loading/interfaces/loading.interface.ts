import { Observable, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export interface Loading extends OnDestroy {
  isLoading: boolean;
  loadingSubscription: Subscription;

  subscribeToLoadingEvents(): void;
  unsubscribeFromLoadingEvents(): void;
}

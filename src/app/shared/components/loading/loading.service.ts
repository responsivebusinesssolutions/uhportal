import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
}

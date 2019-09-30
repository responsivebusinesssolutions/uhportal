import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject: Subject<boolean> = new Subject<boolean>();

  get loadingSubject(): Subject<boolean> {
    return this._loadingSubject;
  }

  push(value: boolean): void {
    this._loadingSubject.next(value);
  }
}

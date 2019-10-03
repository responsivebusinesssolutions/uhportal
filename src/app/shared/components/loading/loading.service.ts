import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject: Subject<boolean | HttpErrorResponse> = new Subject<boolean | HttpErrorResponse>();

  getLoadingSubject(): Subject<boolean | HttpErrorResponse> {
    return this._loadingSubject;
  }

  push(value: boolean | HttpErrorResponse): void {
    this._loadingSubject.next(value);
  }
}

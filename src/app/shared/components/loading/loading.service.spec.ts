import { TestBed, async } from '@angular/core/testing';
import { Subject, from, of } from 'rxjs';

import { LoadingService } from './loading.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });

    loadingService = TestBed.inject(LoadingService);
  }));

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CandidateService } from './candidate.service';

describe('CandidatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: CandidateService = TestBed.inject(CandidateService);

    expect(service).toBeTruthy();
  });
});

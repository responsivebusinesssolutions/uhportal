import { TestBed } from '@angular/core/testing';

import { CandidateService } from './candidate.service';

describe('CandidatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidateService = TestBed.inject(CandidateService);

    expect(service).toBeTruthy();
  });
});

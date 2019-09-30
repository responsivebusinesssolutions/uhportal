import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CandidateService } from './candidate.service';

describe('CandidatesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it('should be created', () => {
    const service: CandidateService = TestBed.inject(CandidateService);

    expect(service).toBeTruthy();
  });
});

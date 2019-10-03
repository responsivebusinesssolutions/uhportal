import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';

import { CandidateService } from './candidate.service';

import { Candidate } from './models/candidate.model';
import { CandidateInput } from './models/candidate-input.model';

import candidatesMock from '@assets/mocks/candidates.json';

describe('CandidatesService', () => {
  let candidateService: CandidateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CandidateService]
    });

    candidateService = TestBed.inject(CandidateService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(candidateService).toBeTruthy();
  });

  it('should return all candidates', () => {
    candidateService.getCandidates().subscribe((candidates: Array<Candidate>) => {
      expect(candidates.length).toBe(3);

      const candidate: Candidate = candidates.find(c => c.id === 3);

      expect(candidate).toBeTruthy();
      expect(candidate.email).toBe('E-mail 3');
    });

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/candidates`);

    expect(req.request.method).toEqual('GET');

    req.flush(candidatesMock);
  });

  it('should save the candidate', () => {
    const candidateInput: CandidateInput = new CandidateInput('expected@email.com', 'Expected candidate output');
    const expectedCandidateOutput: Candidate = new Candidate('expected@email.com', 8, 'Expected candidate output');

    candidateService.saveCandidate(candidateInput).subscribe((candidate: Candidate) => {
      expect(candidate.email).toBe(candidateInput.email);
    });

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/candidates`);

    expect(req.request.method).toEqual('POST');
    expect((req.request.body as CandidateInput).email).toEqual(candidateInput.email);

    req.flush(expectedCandidateOutput);
  });

  it('should give an error if save candidate fails', () => {
    const candidateInput: CandidateInput = new CandidateInput('expected@email.com', 'Expected candidate output');

    candidateService.saveCandidate(candidateInput).subscribe(
      () => fail(),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
      }
    );

    const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}/api/candidates`);

    expect(req.request.method).toEqual('POST');

    req.flush('Saving candidate failed', { status: 500, statusText: 'Internal server error' });
  });
});

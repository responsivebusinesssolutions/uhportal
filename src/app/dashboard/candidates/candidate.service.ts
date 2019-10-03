import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.prod';

import { Candidate } from './models/candidate.model';
import { CandidateInput } from './models/candidate-input.model';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  constructor(private httpClient: HttpClient) {}

  getCandidates(): Observable<Array<Candidate>> {
    return this.httpClient.get<Array<Candidate>>(`${environment.apiUrl}/api/candidates`);
  }

  saveCandidate(candidateInput: CandidateInput): Observable<Candidate> {
    return this.httpClient.post<Candidate>(`${environment.apiUrl}/api/candidates`, candidateInput);
  }
}

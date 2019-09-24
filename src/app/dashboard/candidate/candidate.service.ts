import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { Candidate } from './interfaces/candidate.interface';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  constructor(private httpClient: HttpClient) {}

  getCandidates(): Observable<Array<Candidate>> {
    return this.httpClient.get<Array<Candidate>>(`${environment.apiUrl}/users`);
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from './../shared/material/material.module';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, MaterialModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);

    expect(service).toBeTruthy();
  });
});

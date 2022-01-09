import { TestBed } from '@angular/core/testing';

import { AuthenticationurlGuard } from './authenticationurl.guard';

describe('AuthenticationurlGuard', () => {
  let guard: AuthenticationurlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationurlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed, async, inject } from '@angular/core/testing';

import { AuthNoLoginGuard } from './auth-no-login.guard';

describe('AuthNoLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthNoLoginGuard]
    });
  });

  it('should ...', inject([AuthNoLoginGuard], (guard: AuthNoLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});

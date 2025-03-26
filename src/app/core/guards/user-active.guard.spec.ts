import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userActiveGuard } from './user-active.guard';

describe('userActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
